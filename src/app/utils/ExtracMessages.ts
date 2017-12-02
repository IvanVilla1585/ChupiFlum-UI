

export class ExtracErrorMessages {

  constructor(){}

  getMessages(messages: any, keys: any []){

    let message = '';

    keys.forEach(key => {

      if (messages[key]){
        messages[key].map((msg,) => {
          message += `, ${msg.replace('.', '')}`;
        })
      }
    });
    if (message)
      message = message.substring(1, message.length).trim();
    return message;
  }
}
