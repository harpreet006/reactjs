import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  // alert("fdg")
  await OneSignal.init({ appId: '6ca49614-7be6-453e-a5ae-908636a53170', allowLocalhostAsSecureOrigin: true});
    
    OneSignal.showSlidedownPrompt();
}