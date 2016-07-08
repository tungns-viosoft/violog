
var config = {
    type: 'line',
    data: {
        labels: [],
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

var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};

var randomColor = function(opacity) {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
};


var myLine;
function loadChart(labels,canvasId){
    config.data.labels = labels.slice();

    // var color = addChart(input);

    var ctx = document.getElementById(canvasId).getContext("2d");   
    myLine = new Chart(ctx, config);
    // return color;
};

function reloadChart(){
    myLine.update();
}



function addChart(input){

    //caculate average of every lines in test
    var ln = input.lines[0].zero_loss.slice();

    for(var i = 1; i < input.lines.length; i++){
        $.each(input.lines[i].zero_loss, function(j, vl){
            ln[j] += vl;
        });
    }

    $.each(ln, function(i, l){
        // ln[i] = Math.round(ln[i] / input.lines.length);
        ln[i] = (ln[i] / input.lines.length);
    });

    var background = randomColor(0.5);

    var newset = {
        label: input.session,
        data: ln,
        fill: false,

        borderColor: background,
        backgroundColor: background,
        pointBorderColor: background,
        pointBackgroundColor: background,
        pointBorderWidth: 1,
        id: input.id,
    }

    config.data.datasets.push(newset);

    //reload chart
    myLine.update();

    return background;
}


function removeChart(id){

    $.each(config.data.datasets, function(i, val){

        if(val.id === id){
            config.data.datasets.splice(i,1);
            return false;
        } 
    });
    reloadChart()
}
