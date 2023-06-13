var express = require('express');
var router = express.Router();
var emailService = require('../services/email.service');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/candidature/:etage', function(req, res, next) {
  if(req.params.etage){
    res.render('candidature/apply', { title: 'Express', etage: req.params.etage, success: '', error: ''});
  }
});

router.get('/validate/:email', function(req, res, next) {
  if(req.params.email){
    emailService.sendEmailToTenant(req.params.email).then(() => res.status(200).send({'success': 'Mail envoyé avec succès'})).catch((err) => () => res.status(500).send({'error': err}));
  }else{
    res.send({'erreur': "Adresse mail vide"});
  }
});

router.post('/apply-form', async (req, res, next) => {
  try{

    emailService.sendEmail(req.body, 'fileUrls').then((data) => {
      res.render('candidature/apply', { title: 'Votre demande à été transmise!',  etage: req.body.etage, success: "OK", error: ""});
    }).catch((err) => res.render('candidature/apply', { title: 'Erreur!',  etage: req.body.etage, success : "", error: "ERR"}))
  }catch (error){
    console.error('Error uploading files:', error);
    res.status(500).send('Failed to upload files');
  }
});

module.exports = router;
