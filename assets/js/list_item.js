import { playlist, cd, heading, cdThumb, audio, btn_playsong, player, progress, btn_next, btn_prev, btn_random, btn_repeat,btn_volume } from "./main.js"
const PLAYER_MUSIC='PLAYER_MUSIC'
export const apps = {
    array: [],
    isReapeat: false,
    isRandom: false,
    currentIndex: 0,
    isPlaying: false,
    config:JSON.parse(localStorage.getItem(PLAYER_MUSIC)) || {},
    setSeting:function(key,value){
        this.config[key]=value
        localStorage.setItem(PLAYER_MUSIC,JSON.stringify(this.config))
    },
   
    songs: [{
        id_song: 0,
        name: 'Swear',
        singer: "asmr",
        path: "./assets/music/song3.mp3",
        image: "./assets/image/p1.jpg"
    },
    {
        id_song: 1,
        name: 'Fades',
        singer: "ALan Walker",
        path: "./assets/music/song2.mp3",
        image: "./assets/image/p2.jpg"
    },
    {
        id_song: 2,
        name: 'Đổ vỡ',
        singer: "Jorki",
        path: "./assets/music/song1.mp3",
        image: "./assets/image/p3.jpg"
    },
    {
        id_song: 3,
        name: 'CKTG SONG',
        singer: "PVIS",
        path: "./assets/music/song4.mp3",
        image: "./assets/image/p4.jpg"
    },
    {
        id_song: 4,
        name: 'PayPhone',
        singer: "Maroon",
        path: "./assets/music/song5.mp3",
        image: "./assets/image/p5.jpg"
    },

    ],
    render: function () {
        const html = this.songs.map((song,index) => {
            return `<div class="song ${index === this.currentIndex ?'active':""}"data-index=${index}>
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div> `
        })
        playlist.innerHTML = html.join("\n")
      
    },
    defineProperties: function () {

        Object.defineProperty(this, 'currentSong', {
            get: function () {

                return this.songs[this.currentIndex]
            }

        })
        

    } ,
    handleEvents: function () {
        // handle Enlarge and microcosmic cd
        const _this = this
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scroll = window.scrollY || document.documentElement.scrollTop
            const new_cd_width = cdWidth - scroll

            cd.style.width = new_cd_width > 0 ? new_cd_width + 'px' : 0
            cd.style.opacity = new_cd_width / (cdWidth)
            console.log(cd.style.opacity)
        }
        // animate for cd
        const cd_animate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000,
            iterations: Infinity

        })
        cd_animate.pause()
        //  handle playsong
        btn_playsong.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            }
            else {
                audio.play()
            }
        }
        console.log(cd_animate)
        // the song when play song set onplay and stop set pause
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cd_animate.play()
        }
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cd_animate.pause()
        }
        // set  positon for song when change
        audio.ontimeupdate = function () {
           
            if (audio.duration) {
                const Progress_percent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = Progress_percent
            }
        }
        progress.oninput = function () {
            return audio.currentTime = Math.floor(audio.duration / 100 * progress.value)
        }

        // btn_prev, btn_next
        btn_next.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {

                _this.nextSong()
            }

            audio.play()
            _this.render()

        }
        btn_prev.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {

                _this.prevSong()
            }
            audio.play()
            _this.render()
        }
        // btn_random song
        btn_random.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setSeting('isRandom',_this.isRandom)
            btn_random.classList.toggle('active2', _this.isRandom)
        }
        // btn_repeat song after finised
        btn_repeat.onclick = function () {
            _this.isReapeat = !_this.isReapeat
            _this.setSeting('isReapeat',_this.isReapeat)
            btn_repeat.classList.toggle('active2', _this.isReapeat)
        }
        // audio song end
        audio.onended = function () {
                if(_this.isReapeat){
                    audio.play()
                }
                else{
                    btn_next.click()
                }

        }
        // btn-volume 
        btn_volume.oninput=function(){

         audio.volume= btn_volume.value/100
            console.log(btn_volume.value/100)
        }
        // playlist acive song 
        playlist.onclick=function (e) {
            const song_node=e.target.closest('.song:not(.active)')
            if(song_node || e.target.closest('.option')){
                    if(song_node){
                       _this.currentIndex= Number(song_node.dataset.index)
                       _this.loadCurrentSong()
                       audio.play()
                       _this.render()
                    }
            }
        }
      
    },
   
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    
    loadConfig:function() {
        this.isRandom=this.config.isRandom
        this.isReapeat=this.config.isReapeat
        
    },
    // next song btn
    nextSong: function () {

        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex <= 0) {
            this.currentIndex = 0
            btn_prev.classList.add('btn_disable')
        }
        else {
            btn_prev.disabled = false
            btn_prev.classList.remove('btn_disable')

        }
        this.loadCurrentSong()
    },
    randomsort: function (index) {
        const exist = this.array.some(newindex => {
            return index === newindex
        })
        return exist
    },
    playRandomSong: function () {

        var newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.randomsort(newIndex))
        this.currentIndex = newIndex
        this.loadCurrentSong()
        this.array.push(this.currentIndex)

        if (this.array.length >= this.songs.length) {
            this.array = [this.currentIndex]
        }

    },


    start: function () {
        // refernce variable from config
        this.loadConfig()
        //  Define Property
        this.defineProperties()
        // listen / and event 
        this.handleEvents()
        // download the first infomation of song in UI when run app
        this.loadCurrentSong()
        // Render playlist
        this.render()
        btn_random.classList.toggle('active2', this.isRandom)
        btn_repeat.classList.toggle('active2', this.isReapeat)


    }

}
