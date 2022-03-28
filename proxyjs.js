
window_tao_["filter_"] = ["HTMLIFrameElement","pageYOffset","pageXOffset","hidden","visibilityState","nodeName","createElement","activeElement"];

window_tao_["windownonnative"] = ["Object","Array","Function"];

window_tao_["documentnonnative"] = [];




function proxyfuncwindow(name) {
	if (window_tao_.windownonnative.indexOf(name) !== -1) {
		return window_tao_[name];
	}
		return window_tao_[name].bind(window_tao_);
}

function proxyfuncdoc(name) {
	if (window_tao_.documentnonnative.indexOf(name) !== -1) {
		return document_tao_[name];
	}
		return document_tao_[name].bind(document_tao_);
}


window = new Proxy(
window_tao_,{
	get: function (a, b, c) {
	
	//过滤
	if (window_tao_.filter_.indexOf(b) !== -1) {
		if (typeof (window_tao_[b]) == "function") {
			return proxyfuncwindow(b);
		}
		return window_tao_[b];
	}
	
	console.log("window-get---> ",b,"value ---> ",window_tao_[b]);
	//先判断是否为 function 
	if (typeof (window_tao_[b]) == "function") {
		return proxyfuncwindow(b);
	}

	return window_tao_[b];
		
	},
	
	set:function (x,y,z){
	console.log("window-set----> ",y,"value ---> ",z);
	window_tao_[y] = z;
	return true;
	}
}
);


document = new Proxy(
document_tao_, {
	get: function (a, b, c) {
		
		//过滤
		if (window_tao_.filter_.indexOf(b) !== -1) {
			if (typeof (document_tao_[b]) == "function") {
				return proxyfuncdoc(b);
			}
			return document_tao_[b];
		}

		console.log("document-get---> ", b, "value ---> ", window_tao_[b]);
		
		if (typeof (document_tao_[b]) == "function") {
			return proxyfuncdoc(b);
		}

		return document_tao_[b];
        
    },
    set: function (x,y,z) { 
        console.log("document-set----> ",y,"value ---> ",z);
        document_tao_[y] = z;
        return true;
    }
});
