import { ZwaveDevice } from "homey-zwavedriver";

class AN179Device extends ZwaveDevice {
    async onNodeInit() {
      this.log("AN179 ABOUT TO INIT");
      this.registerReportListener('SWITCH_BINARY', 'SWITCH_BINARY_REPORT', (rawReport, parsedReport) => {
        const onOffString = rawReport['Value'];
        this.log('SWITCH BINARY: ' + onOffString);
        this.setCapabilityValue('onoff', onOffString.startsWith('on'));
      });
      this.registerCapability('onoff', 'BASIC');
      this.log("all done");
  }
}

module.exports = AN179Device;
