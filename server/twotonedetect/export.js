const atone = "atone = "
const btone = "btone = "
const longtone = "longtone = "
const description = "description = "

const alert_command = "alert_command = submit.py [d] [t] [mp3]"
const atonelength = "atonelength = .6"
const btonelength = "btonelength = .6"
const longtonelength = "longtonelength = 7.0"
const playback_during_record = "playback_during_record = 0"

const blank_settings = 
`amr_emails = 
email_body = 
exclude_from = 
exclude_to = 
gaplength = 
ignore_after = 
mp3_emails = 
post_email_command = 
pushbullet_api_key = 
pushbullet_channel = 
pushover_alert_app_token = 
pushover_alert_group_key = 
pushover_record_app_token = 
pushover_record_group_key = 
record_delay = 
text_emails = \n
`

createTone = (capcode) => {
    var returnString = 
        alert_command + '\n' + 
        atone + capcode.tone1 + '\n' +
        atonelength + '\n' +
        btone + capcode.tone2 + '\n' +
        btonelength + '\n' +
        description + capcode.capcode + '\n' +
        playback_during_record + '\n\n'

    return returnString
}

createLongtone = (capcode) => {
    var returnString = 
        alert_command + '\n' + 
        longtone + capcode.tone1 + '\n' +
        longtonelength + '\n' +
        description + capcode.capcode + '\n' +
        playback_during_record + '\n\n'

    return returnString
}

TTDexport = (capcodes) => {
    var returnString = ''
    var tone = 1
    var longtone = 1

    for(var x = 0; x < capcodes.length; x++) {
        
        if(capcodes[x].type === 1) {
            if(capcodes[x].tone1 !== undefined && capcodes[x].capcode !== undefined) {
                returnString += '[Longtone' + longtone + ']\n' + createLongtone(capcodes[x])
                longtone += 1
            }
        } else if(capcodes[x].type === 2) {
            if(capcodes[x].tone1 !== undefined && capcodes[x].tone2 !== undefined && capcodes[x].capcode !== undefined) {
                returnString += '[Tone' + tone + ']\n' + createTone(capcodes[x])
                tone += 1
            }
        }
    }

    return returnString
}

module.exports = { TTDexport }