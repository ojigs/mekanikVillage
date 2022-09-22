window.onload =  () => {
    //for use in production please remove this setTimeOut
    setTimeout(function(){ 
        document.querySelector('.preloader').classList.add('preloader-deactivate');
    }, 1000);
    //uncomment this line for use this snippet in production
    //	$('.preloader').addClass('preloader-deactivate');
};