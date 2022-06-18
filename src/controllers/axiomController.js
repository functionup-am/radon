let axios = require("axios")

// Get all the memes at Postman (https://api.imgflip.com/get_memes)
let allMeme  = async function (req, res) {
    // let meme = req.body
    // console.log(meme)
        try {
            let options = {
                method: 'get',
                url: `https://api.imgflip.com/get_memes`
            }
            let result = await axios(options);
            console.log(result)
            let data = result.data
            res.status(200).send({ msg: data, status: true })
        }
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: err.message })
        }
    }

    // 2. Pick a memeId you want (Eg 129242436) for the POST request
    // 3. Create a Post request (https://api.imgflip.com/caption_image) with only query params. Following are the params (copy username and password exactly as given below):
    // template_id <meme_id>
    // text0 <text you want as a caption>
    // text1 <optional>
    // username chewie12345
    // password meme@123

    // 4. Return a response with a body like this
    // "data": {
    //         "url": "https://i.imgflip.com/5mvxax.jpg",
    //         "page_url": "https://imgflip.com/i/5mvxax"
    //     }
    let pickMemeId = async function (req,res){
          try{
            let template_id = req.query.template_id
            let text0 = req.query.text0
            let text1 = req.query.text1
            let username =req.query.username
            let password = req.query.password
            let body = req.body

            let options = {
                method: 'post',
                url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
            }
            let result = await axios(options);
            res.status(200).send({msg: result.data})
        } catch (err) {                         
            console.log(err)
            res.status(500).send({ msg: "error", status: false })   
        }            
    }


    module.exports.allMeme = allMeme    
    module.exports.pickMemeId = pickMemeId                      