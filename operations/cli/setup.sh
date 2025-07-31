#!/bin/bash
set -e

# Check if an argument was provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 [--production|--integration]"
    exit 1
fi

# Set target based on argument
case "$1" in
    --production)
        TARGET="bewerbungshelfer"
        ;;
    --integration)
        TARGET="bewerbungshelfer-integration"
        ;;
    *)
        echo "Invalid argument. Use --production or --integration"
        exit 1
        ;;
esac

echo "Installing CLI tools on $TARGET..."

# Execute commands on remote server
ssh $TARGET "
    set -e
    echo 'Updating package lists...'
    apt-get update

    echo 'Installing poppler-utils (for pdftoppm, pdftotext, pdfimages)...'
    apt-get install -y poppler-utils

    echo 'Installing tesseract-ocr...'
    apt-get install -y tesseract-ocr
    apt-get install -y tesseract-ocr-deu

		echo 'Installing default-jre...'
		apt-get install -y default-jre

		echo 'Ìnstalling pdf-tk...'
		apt-get install -y pdftk

		echo 'Ìnstalling pdf-tk-java...'
		apt-get install -y pdftk-java

    echo 'Installing libreoffice (for soffice)...'
    apt-get install -y libreoffice-writer

    echo 'Installing libreoffice-java-common...'
    apt-get install -y libreoffice-java-common

    echo 'Installing chromium...'
    apt-get install -y chromium

    echo 'Verifying installations...'
    which pdftoppm
    which tesseract
    which pdftotext
    which soffice
    which pdfimages
    which chromium

    echo 'All tools installed successfully!'
"

echo "Installation on $TARGET complete!"
