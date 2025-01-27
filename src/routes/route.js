const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {pengguna,marketplace,komentar_kerajinan,kerajinan,like_kerajinan,komentar_marketplace, like_marketplace } = require('../controllers');

// const storage = multer.diskStorage({
//     destination:'./src/images/',
//     filename:(req,file,cb)=> {
//         return cb(null,`${file.fieldname}_${Date.now}${path.extname(file.originalname)}`)
//     }
// });

const diskStorage = multer.diskStorage({
    destination:(req, file, cb) => {
      cb(null, 'images');
    },
    // konfigurasi penamaan file yang unik
    filename: (req, file, cb) => {
      cb(null,new Date().getTime()+'-'+file.originalname);
    },
});

const fileFilter = (req,file,cb)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter
})
 

// GET localhost:8080/karyawan => Ambil data semua karyawan
// GET localhost:8080/karyawan/2 => Ambil data semua karyawan berdasarkan id = 2
// POST localhost:8080/karyawan/add => Tambah data karyawan ke database
// PUT localhost:8080/karyawan/edit/2 => Edit data karyawan berdasarkan id = 2
// DELETE localhost:8080/karyawan/delete/2 => Delete data karyawan berdasarkan id = 2


router.get('/pengguna/', pengguna.getdatapengguna);
router.get('/pengguna/:id', pengguna.getdatapenggunabyid);
router.post('/pengguna/login', pengguna.getdatapenggunabyusername);
router.post('/pengguna/add', pengguna.adddatapengguna);
router.put('/pengguna/edit/:id', pengguna.editdatapengguna);
router.delete('/pengguna/delete/:id', pengguna.deletedatapengguna);


router.get('/marketplace/', marketplace.getdatamarketplace);
router.get('/marketplace/:id', marketplace.getdatamarketplacebyid);
router.post('/marketplace/',upload.single('foto'), marketplace.adddatamarketplace);
router.put('/marketplace/:id',upload.single('foto'), marketplace.editdatamarketplace);
router.delete('/marketplace/delete/:id', marketplace.deletedatamarketplace);


router.get('/kerajinan/', kerajinan.getdatakerajinan);
router.get('/kerajinan/:id', kerajinan.getdatakerajinanbyid);
router.post('/kerajinan/add',upload.single('foto'), kerajinan.adddatakerajinan);
router.put('/kerajinan/:id',upload.single('foto'), kerajinan.editdatakerajinan);
router.delete('/kerajinan/:id', kerajinan.deletedatakerajinan);


router.get('/like_kerajinan', like_kerajinan.getdatalike_kerajinan);
router.get('/like_kerajinan/:id', like_kerajinan.getdatalike_kerajinanbyid);
router.post('/like_kerajinan/', like_kerajinan.adddatalike_kerajinan);
router.delete('/like_kerajinan/:pengguna_id/:kerajinan_id', like_kerajinan.deletedatalike_kerajinan);

router.get('/like_marketplace', like_marketplace.getdatalike_marketplace);
router.get('/like_marketplace/:id', like_marketplace.getdatalike_marketplacebyid);
router.post('/like_marketplace/', like_marketplace.adddatalike_marketplace);
router.delete('/like_marketplace/:pengguna_id/:marketplace_id', like_marketplace.deletedatalike_marketplace);


router.get('/komentar_marketplace', komentar_marketplace.getdatakomentar_marketplace);
router.get('/komentar_marketplace/:id', komentar_marketplace.getdatakomentar_marketplacebyid);
router.post('/komentar_marketplace/', upload.single('foto'),komentar_marketplace.adddatakomentar_marketplace);
router.put('/komentar_marketplace/:id',upload.single('foto'), komentar_marketplace.editdatakomentar_marketplace);
router.delete('/komentar_marketplace/:id', komentar_marketplace.deletedatakomentar_marketplace);

router.get('/komentar_kerajinan/get', komentar_kerajinan.getDatakomentar_kerajinan);
router.get('/komentar_kerajinan/get/:id', komentar_kerajinan.getDatakomentar_kerajinanByID);
router.post('/komentar_kerajinan/add',upload.single('foto'), komentar_kerajinan.addDatakomentar_kerajinan);
router.put('/komentar_kerajinan/edit/:id',upload.single('foto'), komentar_kerajinan.editDatakomentar_kerajinan);
router.delete('/komentar_kerajinan/delete/:id', komentar_kerajinan.deleteDatakomentar_kerajinan);

module.exports = router;