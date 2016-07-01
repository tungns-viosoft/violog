

function loadChart(input, canvasId){

    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };


	var config = {
        type: 'line',
        data: {
            labels: input.size,
            datasets: []
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
            hover: {
                mode: 'label'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Size'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Zero loss'
                    }
                }]
            },
            title: {
                display: true,
                text: 'CAW test'
            }
        }
    };


    for(var i = 0; i < input.lines.length; i++ ){
    	var newset = {
    		label: "Time " + i,
    		data: input.lines[i].zero_loss,
    		// lineTension: 0, //tao duong thang
           	fill: false
    	};

    	// console.log(newset);

    	config.data.datasets.push(newset);
    }


    $.each(config.data.datasets, function(i, dataset) {
        var background = randomColor(0.5);
        dataset.borderColor = background;
        dataset.backgroundColor = background;
        dataset.pointBorderColor = background;
        dataset.pointBackgroundColor = background;
        dataset.pointBorderWidth = 1;
    });

    window.onload = function() {

    	console.log(canvasId);

        var ctx = document.getElementById(canvasId).getContext("2d");
        window.myLine = new Chart(ctx, config);
    };

};