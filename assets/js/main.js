// Render song 
// scroll top 
// play/pause/seek
// cd rotate
// random
// next/repeat wwhen ended
// active song
// scroll active song into view
// play song when click
import { apps } from "./list_item.js"
 const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
export const playlist= $('.playlist')
export const cd=$('.cd')
export const heading=$('header h2')
export const cdThumb=$('.cd-thumb')
export const audio=$('#audio')
export const btn_playsong=$('.btn-toggle-play')
export const player=$('.player')
export const progress=$('#progress')
export const btn_next=$('.btn-next')
export const btn_prev=$('.btn-prev')
export const btn_random=$('.btn-random')
export const btn_repeat=$('.btn-reapeat')
export const btn_volume=$('.volume')
apps.start()

