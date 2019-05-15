(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{5391:function(e,t,n){e.exports=n(5636)},5396:function(e,t,n){},5397:function(e,t,n){},5402:function(e,t){},5403:function(e,t){},5405:function(e,t){},5437:function(e,t){},5438:function(e,t){},5484:function(e,t){},5485:function(e,t){},5486:function(e,t){},5636:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(56),i=n.n(o),s=(n(5396),n(5397),n(21)),c=n.n(s),u=n(46),l=n(11),h=n(7),p=n(29),d=n(28),f=n(12),y=n(30),v=n(35),b=n.n(v),m=n(10),g=n(34),k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={pressed:!1},n.playSynth=n.playSynth.bind(Object(f.a)(n)),n.stopSynth=n.stopSynth.bind(Object(f.a)(n)),n.checkMouseDown=n.checkMouseDown.bind(Object(f.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentWillMount",value:function(){this.synth=new m.Synth({envelope:this.props.envelope,oscillator:this.props.oscillator}).toMaster(),this.startTime=null,document.addEventListener("keydown",this.keyboardPress.bind(this)),document.addEventListener("keyup",this.keyboardUp.bind(this))}},{key:"keyboardPress",value:function(e){e.key===this.props.keymap&&this.playSynth(e)}},{key:"keyboardUp",value:function(e){e.key===this.props.keymap&&this.stopSynth(e)}},{key:"playSynth",value:function(e){e.preventDefault(),this.setState({pressed:!0}),this.synth.triggerAttack(this.props.note),this.startTime=m.context.currentTime.toFixed(2)}},{key:"stopSynth",value:function(e){e.preventDefault(),this.setState({pressed:!1}),this.synth.triggerRelease();var t=(m.context.currentTime.toFixed(2)-this.startTime).toFixed(2);null!==this.startTime&&this.props.recording&&this.props.returnNote({pitch:this.props.note,midi:m.Frequency(this.props.note).toMidi(),length:t}),this.startTime=null}},{key:"checkMouseDown",value:function(e){1===e.buttons||3===e.buttons?this.playSynth(e):this.stopSynth(e)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("button",{onMouseDown:function(t){return e.playSynth(t)},onMouseUp:function(t){return e.stopSynth(t)},onTouchStart:function(t){return e.playSynth(t)},onTouchEnd:function(t){return e.stopSynth(t)},onMouseEnter:function(t){return e.checkMouseDown(t)},onMouseLeave:function(t){return e.stopSynth(t)},className:this.state.pressed?"synth-button pressed":"synth-button"}))}}]),t}(a.Component),S=n(70),w=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"play",value:function(e){e.preventDefault(),this.props.isPlaying()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("button",{disabled:this.props.disabled,onMouseDown:function(t){return e.play(t)},onTouchEnd:function(t){return e.play(t)},className:this.props.playing?"synth-button pressed":"synth-button"},r.a.createElement(S.b,null)))}}]),t}(a.Component),E=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={pressed:!1,color:"error"},n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"record",value:function(e){e.preventDefault();var t=this.state.pressed;this.props.isRecording(!t),this.setState({pressed:!t})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("button",{disabled:this.props.disabled,onMouseDown:function(t){return e.record(t)},onTouchEnd:function(t){return e.record(t)},className:this.state.pressed?"synth-button pressed blink_text":"synth-button"},r.a.createElement(S.a,{className:"blink_texts"})))}}]),t}(a.Component),q=n(172),O=n.n(q);var j=function(e){function t(t){e.returnOctave(t.target.value)}return r.a.createElement("div",null,["1","2","3","4","5","6","7","8"].map(function(n,a){return r.a.createElement(O.a,{key:a,className:e.octave===n?"octave-radio-button-checked":"octave-radio-button",checked:e.octave===n,onChange:t,value:n,name:"radio-button-octave","aria-label":n})}))},T=n(173);var N=function(e){var t=Object(a.useState)(!1),n=Object(T.a)(t,2),o=n[0],i=n[1],s=new g.MusicRNN("https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn");function c(){i(!0),console.log("predicting..."),console.log(e.qSequence),e.clearTransportSchedule();var t=function(e){return e.notes.forEach(function(e){e.pitch>84?e.pitch=84:e.pitch<48&&(e.pitch=48)}),e}(e.qSequence);s.continueSequence(t,40,1.5).then(function(t){e.update_sequence(g.sequences.unquantizeSequence(t).notes)}).then(function(){i(!1)})}return Object(a.useEffect)(function(){}),r.a.createElement("div",null,r.a.createElement("button",{disabled:e.disabled,onMouseDown:function(){return c()},onTouchEnd:function(){return c()},className:o?"synth-button mlbutton pressed":"synth-button mlbutton"},r.a.createElement("i",{className:"fas fa-brain"})))},x=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(p.a)(this,Object(d.a)(t).call(this,e))).state={sequence:[],qSequence:null,unqSequence:null,octave:"3",recording:!1,playing:!1},n.returnNote=n.returnNote.bind(Object(f.a)(n)),n.returnOctave=n.returnOctave.bind(Object(f.a)(n)),n.isRecording=n.isRecording.bind(Object(f.a)(n)),n.isPlaying=n.isPlaying.bind(Object(f.a)(n)),n.quantizeNotes=n.quantizeNotes.bind(Object(f.a)(n)),n.play=n.play.bind(Object(f.a)(n)),n.update_sequence=n.update_sequence.bind(Object(f.a)(n)),n.clearTransportSchedule=n.clearTransportSchedule.bind(Object(f.a)(n)),n}return Object(y.a)(t,e),Object(h.a)(t,[{key:"componentWillMount",value:function(){this.envelope={attack:.01,decay:.1,sustain:.5,release:1,attackCurve:"linear",decayCurve:"exponential",releaseCurve:"exponential"},this.oscillator={type:"sawtooth"},this.synth=new m.PolySynth(6,m.Synth).toMaster(),this.synth.set({oscillator:this.oscillator,envelope:this.envelope})}},{key:"isRecording",value:function(){var e=Object(u.a)(c.a.mark(function e(t){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({recording:t}),t){e.next=7;break}return e.next=4,this.quantizeNotes();case 4:this.setupPlayer(),e.next=9;break;case 7:return e.next=9,this.clearTransportSchedule();case 9:m.Transport.toggle();case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"clearTransportSchedule",value:function(){var e=Object(u.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({sequence:[]}),m.Transport.cancel();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"triggerSynth",value:function(e,t){this.synth.triggerAttackRelease(e,t)}},{key:"setupPlayer",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t,n,a=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.sequence,n=0,t.forEach(function(e){e.endTime>n&&(n=e.endTime),m.Transport.schedule(function(){a.triggerSynth(e.note,e.duration)},e.startTime)}),m.Transport.loopEnd=n+1,m.Transport.loop=!0;case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"isPlaying",value:function(){this.state.unqSequence&&(this.setState({playing:!this.state.playing}),this.play())}},{key:"play",value:function(){m.Transport.toggle()}},{key:"update_sequence",value:function(){var e=Object(u.a)(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t).forEach(function(e){e.duration=e.endTime-e.startTime,e.note=m.Frequency(e.pitch,"midi").toNote()}),console.log(n),e.next=5,this.setState({sequence:n});case 5:this.setupPlayer();case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"returnNote",value:function(e){var t=this.state.sequence;t.push({note:e.pitch,pitch:e.midi,startTime:(m.Transport.seconds.toFixed(2)-e.length).toFixed(2),endTime:m.Transport.seconds.toFixed(2),duration:e.length}),this.setState({sequence:t})}},{key:"returnOctave",value:function(e){this.setState({octave:e})}},{key:"quantizeNotes",value:function(){var e=Object(u.a)(c.a.mark(function e(){var t,n,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.sequence,n={notes:t,totalTime:t[t.length-1].endTime},a=g.sequences.quantizeNoteSequence(n,4),this.setState({qSequence:a,unqSequence:n});case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.octave,n=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],a=["a","w","s","e","d","f","t","j","i","k","o","l"],o=(n=n.map(function(e){return e+t})).map(function(e,t){return{note:e,keymap:a[t]}}),i=!this.state.qSequence,s=!!this.state.playing,c=!!this.state.recording;return r.a.createElement("div",null,r.a.createElement("div",{className:"pad"},r.a.createElement(b.a,{container:!0,spacing:24,justify:"center"},o.map(function(t,n){return r.a.createElement(b.a,{item:!0,sm:2,key:n},r.a.createElement(k,{note:t.note,keymap:t.keymap,returnNote:e.returnNote,evelope:e.envelope,oscillator:e.oscillator,recording:e.state.recording}))}))),r.a.createElement("div",{className:"playback-buttons"},r.a.createElement(b.a,{container:!0,spacing:24,justify:"center"},r.a.createElement(b.a,{item:!0,sm:2},r.a.createElement(w,{isPlaying:this.isPlaying,playing:this.state.playing,disabled:c})),r.a.createElement(b.a,{item:!0,sm:2},r.a.createElement(E,{isRecording:this.isRecording,disabled:s})),r.a.createElement(b.a,{item:!0,sm:2},r.a.createElement(N,{disabled:i,qSequence:this.state.qSequence,update_sequence:this.update_sequence,clearTransportSchedule:this.clearTransportSchedule})))),r.a.createElement("div",{className:"octave-container"},r.a.createElement(j,{returnOctave:this.returnOctave,octave:this.state.octave})))}}]),t}(a.Component);var M=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(x,null))},D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(M,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/web-synth",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/web-synth","/service-worker.js");D?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):P(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):P(t,e)})}}()}},[[5391,1,2]]]);
//# sourceMappingURL=main.3aae1130.chunk.js.map