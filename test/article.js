//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let Article = require('../models/articleModel')

//Require the dev-dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect

chai.use(chaiHttp)

describe('Blog API Integration Tests', function() {
  // read
  describe('#GET / article', function() { 
    it('should get all article', function(done) { 
      chai.request('http://localhost:3000') .get('/api/article')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('array'); 
          // expect(res.body).to.be.empty; 
          done(); 
        }); 
    });
  });
  // create
  describe('## Create article ', function() { 
    it('should create a article', function(done) { 
      let newArticle = {
        title : `'Justice League' dari Puncak Box Office`,
        category : 'hiburan',
        description : 'Jakarta, CNN Indonesia -- Film animasi Disney dan Pixar, Coco sukses mengusir gerombolan super hero DC di Justice League dari puncak box office. Coco diperkirakan sanggup meraih US$49 juta atau lebih dari Rp662 miliar di pasar domestik Amerika Utara di pekan debutnya.',
      }
      chai.request('http://localhost:3000') 
      .post('/api/article') 
      .send(newArticle) 
      .end(function(err, res) { 
        // console.log(res.body)
        expect(res.statusCode).to.equal(201); 
        expect(res.body).to.be.an('object');
        expect(res.body.data_Article).to.have.property('title').eql(`'Justice League' dari Puncak Box Office`);
        expect(res.body.data_Article).to.have.property('category').eql('hiburan'); 
        newArticle = res.body; 
        done(); 
      }); 
    }); 
  }); 
  // // update
  describe('### Update article', function(){
    it('should update a article', function(done) { 
      chai.request('http://localhost:3000') 
      .put('/api/article/5a1be20adcc9fe2933a6922d') 
      .send({
        title : `Saham Waspada Aksi Ambil Untung Akhir Tahun`,
        category : 'ekonomi',
        description : 'Jakarta, CNN Indonesia -- Indeks Harga Saham Gabungan (IHSG) diproyeksi bergerak terbatas sepanjang pekan ini, akibat aksi ambil untung (profit taking) kembali marak dilakukan pelaku pasar untuk kebutuhan liburan akhir tahun.\n\nSejumlah analis menyatakan, pelaku pasar juga tidak memiliki dorongan untuk melakukan aksi beli karena tidak ada ada dorongan sentimen positif dari dalam negeri.'
      
      }) 
      .end(function(err, res) { 
        // console.log('err>>>',err)
        // console.log('resbody<<<',res.body)
        expect(res.statusCode).to.equal(201); 
        expect(res.body).to.be.an('object');
        expect(res.body.data_Article).to.have.property('title').eql(`Saham Waspada Aksi Ambil Untung Akhir Tahun`);
        expect(res.body.data_Article).to.have.property('category').eql('ekonomi'); 
        data_Article = res.body; 
        done(); 
      });
    }); 
  })
  // // delete
  describe('#### delete article', function(){
    it('should delete a article', function(done) { 
      chai.request('http://localhost:3000') 
      .delete('/api/article/5a1be23f0f8aa12b575e93e2') 
      .end(function(err, res) { 
        // console.log('err>>>',err)
        // console.log('resbody<<<',res.body)
        expect(res.statusCode).to.equal(200); 
        done(); 
      });
    }); 
  })
  
});