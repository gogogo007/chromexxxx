

window_tao_["filter_"] = ["HTMLIFrameElement","pageYOffset","pageXOffset","hidden","visibilityState","nodeName","createElement"];

window_tao_["windownonnative"] = ["Object","Array","Function"];

window_tao_["documentnonnative"] = [];

window = new Proxy(

window_tao_,{

	get:function (a,b,c){

	//过滤

	if (window_tao_.filter_.indexOf(b) !== -1) {

		if (typeof (window_tao_[b]) == "function") {

				return window_tao_[b].bind(window_tao_);

			}

		return window_tao_[b];

	}

	//console.log("window-get----> ",b,"value ---> ",window_tao_[b]);

	//一些方法不用 bind window_tao_

	if (window_tao_.windownonnative.indexOf(b) !== -1) {

		return window_tao_[b];

	}

	

		

	return window_tao_[b];

	},

	set:function (x,y,z){

	//console.log("window-set----> ",y,"value ---> ",z);

	window_tao_[y] = z;

	return true;

	}

}

);

document = new Proxy(

document_tao_, {

    get: function (a, b, c) {

		if (window_tao_.filter_.indexOf(b) !== -1) {

			if (typeof (document_tao_[b]) == "function") {

				return document_tao_[b].bind(document_tao_);

			}

			return document_tao_[b];

		}

        //console.log("document-get----> ", b, "value ---> ", document_tao_[b]);

		//一些方法不用 bind document_tao_

		if (window_tao_.windownonnative.indexOf(b) !== -1) {

			return window_tao_[b];

		}

        return document_tao_[b]

        

    },

    set: function (x,y,z) { 

        //console.log("document-set----> ",y,"value ---> ",z);

        document_tao_[y] = z;

        return true;

    }

});
