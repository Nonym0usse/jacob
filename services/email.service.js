const nodemailer = require('nodemailer');
async function sendEmail(data, files){
    new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'hotmail', // Use your email service provider
            auth: {
                user: 'colocservice@hotmail.com', // Your email address
                pass: '}9RZNvGC', // Your email password
            },
        });
        const anchorTag = `<a href="https://colocservice.fr/validate/${data?.email}">ICI</a>`;

        const mailBody = "<h4>Voici les informations du colocataire :</h4>" +
            "<p> Nom & Prénom : " + data?.name + "</p>" +
            "<p> Genre : " + data?.gender + "</p>" +
            "<p> E-mail : " + data?.email + "</p>" +
            "<p> Adresse : " + data?.address + "</p>" +
            "<p> Garant : " + data?.garant + "</p>" +
            "<p> Profession : " + data?.job + "</p>" +
            "<p> Téléphone : " + data?.phone + "</p>" +
            "<p> Nationalité : " + data?.nationality + "</p>" +
            "<p> Revenus : " + data?.income + "€</p>" +
            "<hr>"+
            "<h4>Garant locataire</h4>" +
            "<p> Nom & prénom : " + data?.guarantorname + "</p>" +
            "<p> Revenus : " + data?.incomeguarantor + "€</p>" +
            "<p> Téléphone : " + data?.phoneguarantor + "</p>" +
            "<hr>"+
            "<p>Si son profil convient, merci de valider ce lien : <b>" + anchorTag +"</b></p>";

        const mailOptions = {
            from: 'colocservice@hotmail.com', // Sender's email address
            to: 'colocservice@gmail.com', // Recipient's email address
            subject:  "[JACOB] - " + data?.name + " à postulé " + data?.etage + "étage", // Email subject
            html: mailBody,
            attachments: files.map((file) => ({
                filename: file.originalname,
                path: file.path,
            })),
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve("Merci, votre candidature à été envoyée");
            }
        });
    })
}

async function sendEmailToTenant(email){

    new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'hotmail', // Use your email service provider
            auth: {
                user: 'colocservice@hotmail.com', // Your email address
                pass: '}9RZNvGC', // Your email password
            },
        });
        const anchorTag = `https://buy.stripe.com/cN2fZs05KdAsbLO8ww`;

        const mailBody = "<p>Bonjour, <br>" +
            "Après vérification de votre dossier, c'est avec joie que je vous annonce que votre dossier à été accepté!</p>" +
            "<p>Il reste une dernière étape avant de pouvoir réserver votre chambre: <b>Le paiement du dépôt de garantie</b> de 470€ qui sera restitué le jour de votre départ.<br>" +
            "Pour régler, suivez ce lien Stripe :" + anchorTag + "</p>" +
            "<p>N'oubliez pas aussi d'assurer votre chambre 😉<br>" +
            "Une fois le paiement reçu, on conviendra d'une date de remise des clés, d'un état des lieux d'entrée, la signature du bail et du paiement du loyer au prorata de votre date d'entrée.</p>" +
            "<p>Bien cordialement <br>" +
            "Cyril - SCI JACOB <br>" +
            "11 Avenue Jacques Prévert - 13730 Saint-Victoret <br>"+
            "SIREN: 831 840 657 - mail: colocservice@gmail.com</p>" +
            "<p><b>Ceci est un message automatique, merci de ne pas y répondre.</b></p>"

        const mailOptions = {
            from: 'colocservice@hotmail.com', // Sender's email address
            to: email, // Recipient's email address
            subject:  "Dossier Accepté ✅ - Colocation 56 Rue de Forbin 13002 Marseille ", // Email subject
            html: mailBody
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve("Merci, votre candidature à été envoyée");
            }
        });
    })
}

module.exports = {sendEmail, sendEmailToTenant};
