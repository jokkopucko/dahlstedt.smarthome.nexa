declare module 'homey-zwavedriver' {

    declare class ZwaveDevice extends Homey.Device {
        node: any;
        log(string, any?): void;
        registerCapability(string, string, object?);
        registerReportListener(string, string, fn: (x: any, y: any) => void);
        setCapabilityValue(string, boolean);
    }

};