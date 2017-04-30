import * as _ from 'underscore';

export class ModalService {
  private modals = [];

  add(modal) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id) {
    // remove modal from array of active modals
    let modalToRemove = _.find(this.modals, { id: id });
    //this.modals = _.out(this.modals, modalToRemove);
  }

  open(id) {
    // open modal specified by id
    let modal = _.find(this.modals, { id: id });
    modal.open();
  }

  close(id) {
    // close modal specified by id
    let modal = _.find(this.modals, { id: id });
    modal.close();
  }
}