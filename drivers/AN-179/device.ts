import { ZwaveDevice } from "homey-zwavedriver";

class AN179Device extends ZwaveDevice {
    async onNodeInit() {
      this.log("AN179 ABOUT TO INIT");
      this.registerReportListener(
        'NOTIFICATION',
        'NOTIFICATION_REPORT',
        (x, y) => {
            this.log(x);
            if (x['Notification Type'] === 'Access Control') {
               this.setCapabilityValue('alarm_contact', x.Event === 22);
            }
            if (x['Notification Type'] === 'Home Security') {
                this.setCapabilityValue('alarm_tamper', x.Event != 0);
            }
        }
      );
      this.registerCapability('onoff', 'BASIC');
      this.log("all done");
  }
}

module.exports = AN179Device;
