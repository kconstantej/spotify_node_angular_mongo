var path = require('path');

var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination')

var Artist = require ('../models/artist');

var Album = require ('../models/album');

var Song = require ('../models/song');

function getArtist(req,res){

    var artistId= req.params.id;
    Artist.findById(artistId,(err,artist)=>{
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
    
}

function saveArtist(req,res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err,artisStorage)=>{
        if(err){
            res.status(500).send({message: 'error al guardar el artista'});
        }else{
            if(!artisStorage){
                res.status(404).send({message: 'el artista no ha sido guardado'});
            }else{
                res.status(200).send({artis:artisStorage});
            }
        }
    })
}

function getArtists(req, res){

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsParPage = 3;

    Artist.find().sort('name').paginate(page,itemsParPage,function(err,artists,total){
        if(err){
            res.status(500).send({message: 'error en la peticion'});
        }else{
            if(!artists){
                res.status(404).send({message: 'no hay artistas'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    artist: artists
                })
            }
        }
    });
}

function updateArtist(req, res){
    var artistId= req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err, artistUpdate)=>{
        if(err){
            res.status(500).send({message: 'error al actualizar el artista'});
        }else{
            if(!artistUpdate){
                res.status(404).send({message: 'el artista no fue actualizado'});
            }else{
                res.status(200).send({artist: artistUpdate});
            }
        }
    });
}

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId,(err,artistRemoved)=>{
        if(err){
            res.status(500).send({message: 'error al eliminar el artista'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'no se a eliminado el artista'});
            }else{
                
                

                Album.find({artist: artistRemoved._id}).remove((err,albumRemove)=>{
                    if(err){
                        res.status(500).send({message: 'error al eliminar el album'});
                    }else{
                        if(!albumRemove){
                            res.status(404).send({message: 'no se a eliminado el albun'});
                        }else{
                            Song.find({album: albumRemove._id}).remove((err,songRemove)=>{
                                if(err){
                                    res.status(500).send({message: 'error al eliminar la cancion'});
                                }else{
                                    if(!songRemove){
                                        res.status(404).send({message: 'no se a eliminado la cancion'});
                                    }else{
                                        res.status(200).send({artist:artistRemoved});

                                    }
                                }
                            });
                        }
                    }
                });


            }
        }
    });
}

function uploadImage(req,res){
    var artistId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name=file_split[2];

        var ext_split=file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png'  ||  file_ext == 'jpg'  || file_ext == 'gif'){
            Artist.findByIdAndUpdate(artistId,{image:file_name},(err,artistUpdated)=>{
                if(!artistUpdated){
                    res.status(404).send({message: 'No se ha pododo actualizar el artista'}); 
    
                }else{
                    res.status(200).send({artist: artistUpdated}); 
                }
            });
        }else{
            res.status(200).send({message: 'Extension del archivo no valida'}); 
        }
    }else{
        res.status(200).send({message: 'No se ha subido imagen...'}); 
    }
};

function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/artists/'+imageFile;

    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe imagen...'}); 
        }
    })
}

module.exports={
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}