window.onload = function () {
	render();
}

// 从localStorage拉取数据渲染表格
function render(){
	var pieceData = localStorage.length ? JSON.parse(localStorage.getItem('00001')) : '';
	if(pieceData){
		var inputs = document.getElementsByTagName('input');
		for(var i = 0; i<inputs.length; i++) {
			var name = inputs[i].name;
			inputs[i].value = pieceData[name]
		}
		var textareas = document.getElementsByTagName('textarea');
		for(var i = 0; i<textareas.length; i++) {
			var name = textareas[i].name;
			textareas[i].value = pieceData[name];
		}
		var select = document.getElementsByTagName('select')[0];
		select.value = pieceData.priceType == '0' ? 0 : pieceData.priceType;
	}
}

// 打印当前表格
function printdiv(printId) { 
	if(!validate_required()){
		return false;
	};

	var oldstr = document.body.innerHTML; 
	var inputs = document.getElementsByTagName('input');
	var inputLength = inputs.length;
	for(var i = 0; i<inputLength; i++) {
		inputs[0].parentNode.innerHTML = '<p>' + inputs[0].value + '</p>';
	}
	var textareas = document.getElementsByTagName('textarea');
	var textLength = textareas.length
	for(var i = 0; i<textLength; i++) {
		console.log(textareas[0].value);
		textareas[0].parentNode.innerHTML = '<p style="height:' + textareas[0].style.height +'">' + textareas[0].value + '</p>';
	}
	var select = document.getElementsByTagName('select')[0];
	var words = '请选择';
	switch(select.value){
		case '1':
			words = '含税价';
			break;
		case '2':
			words = '不含税价';
			break;
		default:
			break;
	}
	select.parentNode.innerHTML = '<p class="level3" style="display: inline">' + words + '</p>';
	var headstr = "<html><head><title></title></head><body>"; 
	var footstr = "</body>"; 
	var newstr = document.getElementById(printId).innerHTML;
	document.body.innerHTML = headstr+newstr+footstr; 
	window.print(); 
	// document.body.insertAdjacentHTML("beforeEnd", "<object id=\"WebBrowser\" width=0 height=0 classid=\"clsid:8856F961-340A-11D0-A96B-00C04FD705A2\">");
	// document.all.WebBrowser.ExecWB(6,6)

	document.body.innerHTML = oldstr;
	render() 
	//return false; 
}

// 保存当前数据
function saveAll() {
	var pieceData = {
		'companyName': '',
		'companyCode': '',
		'productCode': '',
		'productName': '',
		'vehicleType': '',
		'produceN2': '',
		'produceN1': '',
		'produceN': '',
		'priceN2': '',
		'priceN1': '',
		'priceN': '',
		'priceCutN2': '',
		'priceCutN1': '',
		'priceCutN': '',
		'SSBN2': '',
		'SSBN1': '',
		'SSBN': '',
		'otherExplanation': '',
		'userComments': '',
		'proDirectorComments': '',
		'priceType': '',
		'price': '',
		'payTerms': '',
		'execDate': '',
		'applicantSign': '',
		'branchMComments': '',
		'depMComments': '',
		'fanMComments': '',
		'saleMComments': '',
		'operMComments': '',
		'GMComments': ''
	}
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i<inputs.length; i++) {
		var name = inputs[i].name;
		pieceData[name] = inputs[i].value;
	}
	var textareas = document.getElementsByTagName('textarea');
	for(var i = 0; i<textareas.length; i++) {
		var name = textareas[i].name;
		pieceData[name] = textareas[i].value;
	}
	pieceData.priceType = document.getElementsByTagName('select')[0].value;
	localStorage.setItem('00001', JSON.stringify(pieceData));
}

// 清除当前全部数据
function clearAll() {
	localStorage.removeItem('00001');
	window.location.reload();
}

function validate_required(){
	var alertMsg = {
		'companyName': '请填写客户名称',
		'companyCode': '请填写单位代码',
		'productCode': '请填写产品图号',
		'productName': '请填写产品名称',
		'vehicleType': '请填写配套车型',
		'produceN': '请填写N年产量',
		'priceN': '请填写N年价格',
		'priceCutN': '请填写N年降价幅度',
		'SSBN': '请填写N年SSB供货比例',
		'userComments': '请填写用户意见',
		'proDirectorComments': '请填写项目主管意见',
		'priceType': '请选择价格类型',
		'price': '请填写价格',
		'payTerms': '请填写付款条件',
		'execDate': '请填写执行日期',
		'applicantSign': '请填写申报人签字',
	}
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i<inputs.length; i++){
		if(inputs[i].required){
			if(inputs[i].value){
				continue;
			} else {
				alert(alertMsg[inputs[i].name]);
				return false
			}
		}
	}
	var textareas = document.getElementsByTagName('textarea');
	for(var i = 0; i<textareas.length; i++){
		if(textareas[i].required){
			if(textareas[i].value){
				continue;
			} else {
				alert(alertMsg[textareas[i].name]);
				return false
			}
		}
	}
	var select = document.getElementsByTagName('select')[0];
	if(select.value == '0') {
		alert(alertMsg[select.name])
		return false
	}
	return true

}