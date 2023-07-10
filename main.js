status_0 = "";
results_1 = [];
object_name="";
function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(400,300);
    video.hide();
    
}

function preload() {
    
}

function draw() {
    image(video, 0, 0, 700, 400);
    if (status_0 != "") {
        object_detector.detect(video, gotresults);
        for (i = 0; i < results_1.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            confidence=(results_1[i].confidence *100).toFixed(1);
            label=results_1[i].label;
            text(results_1[i].label +" " + confidence + "%",results_1[i].x + 15,results_1[i].y +15);
            noFill();
            stroke("blue");
            rect(results_1[i].x, results_1[i].y, results_1[i].width, results_1[i].height);
            if(results_1[i].label==object_name){
                video.stop();
                object_detector.detect(gotresults);
                document.getElementById("status").innerHTML = object_name +  " found";
            }
            else{
                document.getElementById("status").innerHTML = object_name +  " not found";

            }
        }

    }

}

function start_finder() {
    object_detector = ml5.objectDetector("cocossd", model_loadad);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
   object_name=document.getElementById("input").value;
}

function model_loadad() {
    console.log("success");
    status_0 = true;
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    results_1 = results;
}