FROM debian:bookworm
RUN apt-get update && apt-get --yes upgrade

RUN \
  apt-get install --yes \
  # Needed for pdftottext (I think): \
  poppler-utils \
	pdftk chromium \
  # Needed to install rust via rustup (see below): \
  curl \
  # Probably needed by Rust for linking to native libraries: \
  build-essential pkg-config \
  # Needed for Rust's native ssl: \
  libssl-dev \
  # Needed to build and serve the frontend: \
  npm

RUN useradd -ms /bin/bash user
USER user

# As of this writing, 1.79.0 is the current stable version of Rust. We can't use the rust toolchain
# packaged with debian because sqlx depends on a newer version.
# We should probably update the Rust toolchain to most recent stable version periodically.
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y --default-toolchain=1.79.0

# Even though rustup will put some PATH manipulations in .bashrc, we need to add the cargo .bin
# path to the PATH variable here explicitly. I think that's because bash sources .bashrc only if
# it's run interactively, but Docker executes it in non-interactive mode.
ENV PATH="$PATH:/home/user/.cargo/bin"
RUN rustup component add rustfmt

# Ideally, we would install the sqlx cli via Cargo.toml instead of globally for the user. But
# binary dependencies are unstable, so for now we have to install it like so:
RUN cargo install sqlx-cli

# The project directory should be mounted to this directory:
WORKDIR /home/user/bewerbungshelfer

# The ports served by `npm run start` and our API backend:
EXPOSE 3000 3001

CMD ["/usr/bin/tail", "-f", "/dev/null"]
