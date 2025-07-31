use lettre::message::Mailbox;
use lettre::Address;
use lettre::Message;

pub fn from_mailbox() -> Mailbox {
    Mailbox {
        name: Some("Bewerbungshelfer".to_string()),
        email: Address::new("noreply", "bewerbungshelfer.net").unwrap(),
    }
}

pub fn reply_to_mailbox() -> Mailbox {
    from_mailbox()
}

#[cfg(feature = "mail")]
pub async fn send_mail(message: Message) -> Result<(), ()> {
    use lettre::transport::smtp::authentication::Credentials;
    use lettre::AsyncSmtpTransport;
    // use lettre::transport::smtp::AsyncSmtpTransport;
    use lettre::AsyncTransport;
    use lettre::Tokio1Executor;

    use crate::credentials::*;

    let credentials = Credentials::new(SMTP_ACCOUNT.to_string(), SMTP_PASSWORD.to_string());

    type Transport = AsyncSmtpTransport<Tokio1Executor>;
    // We're using starttls (via port 587) instead of the default smtps (port 465), because
    // Hetzner cloud blocks outgoing traffic on port 465. See
    // https://docs.hetzner.com/cloud/servers/faq/#why-can-i-not-send-any-mails-from-my-server
    let mailer: Transport = Transport::starttls_relay(SMTP_DOMAIN)
        .map_err(|err| {
            eprintln!("Failed to open stmp transport to {SMTP_DOMAIN}: {err}");
            ()
        })?
        .credentials(credentials)
        .build();

    mailer.send(message).await.map_err(|err| {
        eprintln!("Failed to send mail via smtp: {err}");
        ()
    })?;
    Ok(())
}

#[cfg(not(feature = "mail"))]
pub async fn send_mail(message: Message) -> Result<(), ()> {
    use mailparse::parse_mail;

    let formatted_message = message.formatted();
    let parsed_message =
        parse_mail(formatted_message.as_slice()).expect("Failed to parse formatted message");

    let subject = parsed_message
        .headers
        .iter()
        .find_map(|header| {
            (header.get_key_ref().to_lowercase() == "subject").then_some(header.get_value())
        })
        .expect("message should have a subject");
    let to = parsed_message
        .headers
        .iter()
        .find_map(|header| {
            (header.get_key_ref().to_lowercase() == "to").then_some(header.get_value())
        })
        .expect("message should have a receiver");
    println!("To: {to}");
    println!("Subject: {subject}");

    let body = parsed_message
        .parts()
        .find_map(|part| {
            let mimetype = part.ctype.mimetype.as_str();
            if mimetype.starts_with("text/html") {
                Some(
                    part.get_body()
                        .expect("message should have a valid html body"),
                )
            } else {
                None
            }
        })
        .expect("message should have an html body");

    println!("{body}");

    Ok(())
}
