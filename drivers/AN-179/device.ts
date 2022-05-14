import { ZwaveDevice } from "homey-zwavedriver";

class AN179Device extends ZwaveDevice {
    async onNodeInit() {
      //this.enableDebug();
      //this.printNode();
      this.log("AN179 ABOUT TO INIT");
      this.registerReportListener('SWITCH_BINARY', 'SWITCH_BINARY_REPORT', (rawReport, parsedReport) => {
        const onOffString = rawReport['Value'];
        const isOn = onOffString.startsWith('on');
        this.log('SWITCH BINARY: ' + onOffString + ' ' + isOn);
        this.setCapabilityValue('onoff', isOn);
      });
      this.registerReportListener('NOTIFICATION', 'NOTIFICATION_REPORT', (rawReport, parsedReport) => {
        this.log('NOTIFICATION: ' + JSON.stringify(rawReport));
      });
      this.registerCapability('onoff', 'BASIC');
      this.log("all done");
  }
}

module.exports = AN179Device;
