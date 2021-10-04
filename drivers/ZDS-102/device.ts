import { ZwaveDevice } from "homey-zwavedriver";

class ZDS102Device extends ZwaveDevice {
  async onNodeInit() {
    this.log("I am about to init myself now");
    this.registerCapability('measure_battery', 'BATTERY', { getOpts: { getOnOnline: true } });
    this.registerReportListener('BATTERY', 'BATTERY_REPORT', (x, y) => {
      this.log('Battery says:', x['Battery Level']);
      this.setCapabilityValue('measure_battery', x['Battery Level']);
    });
    this.registerCapability('alarm_contact', 'NOTIFICATION');
    this.registerCapability('alarm_tamper', 'NOTIFICATION');
    if (Date.now() == 0) {
      this.registerReportListener('NOTIFICATION', 'NOTIFICATION_REPORT', (x, y) => {
        this.log(x);
        if (x['Notification Type'] === 'Access Control') {
          this.setCapabilityValue('alarm_contact', x.Event === 22);
        }
        if (x['Notification Type'] === 'Home Security') {
          this.setCapabilityValue('alarm_tamper', x.Event != 0);
        }
      });
    }
    this.log("all done");
  }
}

module.exports = ZDS102Device;
