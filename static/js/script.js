  
function addVideoBlock(id, idx) {
    var img_btns = document.getElementsByClassName('btn-img-videos');
    if (img_btns.length > 0) {
        for (var i = 0; i < img_btns.length; i++) {
            set_inactive(img_btns[i]);
        }
        set_active(img_btns[idx]);
    }

    var shape_des = document.getElementById('shape-des');
    // shape_des.innerText = 'Shape description: ' + shape[id]
    shape_des.innerHTML = '<strong>Shape description:</strong> ' + shape[id];
    var motion_des = document.getElementById('motion-des');
    // motion_des.innerText = 'Motion description: ' + motion[id]
    motion_des.innerHTML = '<strong>Motion description:</strong> ' + motion[id];

    var basePath = "./static/videos";
    var methods = ['gt', 'ours', 'diffuse', 't2m'];
    var methods2 = ['body', 'mgpt', 'mld', 'mdm'];

    var targetDiv = document.getElementById('video_block');
    var targetDiv2 = document.getElementById('video_block2');

    if (!targetDiv.hasChildNodes()) {
        createVideoContent(id, methods, basePath, targetDiv);
        createVideoContent(id, methods2, basePath, targetDiv2);
    } else {
        updateVideoContent(id, methods, basePath, targetDiv);
        updateVideoContent(id, methods2, basePath, targetDiv2);
    }
}

function createVideoContent(id, methods, basePath, container) {
    var newDiv = document.createElement('div');
    newDiv.className = 'item';
    newDiv.id = id;

    methods.forEach(method => {
        var videoSrc = `${basePath}/${method}/${method}_${id}.mp4`;
        appendVideoElement(newDiv, videoSrc, method==='body', method==='gt');
    });

    container.appendChild(newDiv);
    container.appendChild(document.createElement('br'));
}

function appendVideoElement(parent, src, is_body, is_gt=false, no_border=false) {
    var videoElement = document.createElement('video');
    setupVideoAttributes(videoElement, '24.7%');
    // console.log(is_body);
    if (is_body){
        videoElement.style.paddingLeft = '2.02%';
        videoElement.style.paddingRight = '2.02%';
    }

    if ((is_gt || is_body) && !no_border){
        videoElement.style.borderRight = '2px solid rgb(169, 83, 3)';
    }

    var sourceElement = document.createElement('source');
    sourceElement.src = src;
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);

    // Add error listener for loading fallback placeholder
    videoElement.addEventListener('error', function () {
        showPlaceholder(parent, videoElement);
    });

    parent.appendChild(videoElement);
}

function setupVideoAttributes(video, width) {
    video.setAttribute('autoplay', '');
    video.setAttribute('controls', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.style.width = width;
    // video.style.margin = '.2%';
    video.muted = true;
    video.style.display = 'inline-block';
    
}

function showPlaceholder(container, videoElement) {
    var placeholder = document.createElement('img');
    placeholder.src = "./static/videos/placeholder.png";
    placeholder.style.width = videoElement.style.width;
    placeholder.style.margin = videoElement.style.margin;
    container.replaceChild(placeholder, videoElement);
}

function updateVideoContent(id, methods, basePath, container) {
    var videos = container.querySelectorAll('video');
    methods.forEach((method, index) => {
        var videoSrc = `${basePath}/${method}/${method}_${id}.mp4`;
        if (index < videos.length) {
            let videoElement = videos[index];
            let sourceElement = videoElement.children[0];
            sourceElement.src = videoSrc;
            videoElement.load(); 
            videoElement.play().catch(error => {
                console.error("Video play failed:", error);
            });
        } else {
            appendVideoElement(container, videoSrc, method === 'body',  method==='gt');
        }
    });
}

function set_inactive(btn) {
    btn.classList.remove('on');
}
function set_active(btn) {
    btn.classList.add('on');
}

let action2id = {
    'run': {
        'Run 1': '000019',
        'Run 2': '000099',
        'Run 3': '000904',
        'Run 4': '002082',
    },
    'walk': {
        'Walk 1': '000066',
        'Walk 2': '000337',
        'Walk 3': '000710',
        'Walk 4': '000862',
        'Walk 5': '001976',
        'Walk 6': '000343',
    },
    'jump': {
        'Jump 1': '001592',
        'Jump 2': '002474',
        'Jump 3': '002091',
    },
    'swim': {
        'Swim 1': '000865',
        'Swim 2': '003138',
    },
    'gymnastic': {
        'Cartwheel': '001008',
        'Hand Stand': '002103',
        'Workout': '000296',
        'Dance': '000556',
        'Spin': '001282',
    },
    'walk_stair': {
        'Walk Down': '000285',
        'Walk Up': '001603',
        'Walk Up & Down': '002246',
    },
    'squat': {
        'Squat 1': '001005',
        'Squat 2': '002718',
        'Squat 3': '002750',
    },
    'other': {
        'Play guitar': '000085',
        'Clap hands': '000086',
        'Pick item': '001009',
        'Clean': '001113',
        'Crawl': '001888',
        'Throw': '002074',
    }
};

function selectAction(action, idx) {
    const condition2Buttons = document.getElementById('actionID');
    condition2Buttons.innerHTML = ''; // Clear existing buttons
    Object.keys(action2id[action]).forEach((cond, index) => {
        let button = document.createElement('button');
        button.className = 'btn-img-videos';
        button.textContent = cond;
        button.style.width = '15%';
        // button.onclick = () => displayVideos(condition, cond);
        button.onclick = () => addVideoBlock(action2id[action][cond], index);
        condition2Buttons.appendChild(button);
    });

    var img_btns = document.getElementsByClassName('btn-img-videos');
    img_btns[0].click();
    set_active(img_btns[0]);


    var img_btns = document.getElementsByClassName('btn-img');
    if(img_btns.length > 0){
        for(var i = 0; i < img_btns.length; i++) {
            set_inactive(img_btns[i]);
        }
        // selected_index = source_options.indexOf(selected_source);
        // console.log(selected_index);
        set_active(img_btns[idx]);
    }
}

function div_selectAction(idx, button_idx) {
    var targetDiv = document.getElementById('diversity_video_block');
    var body_ids = ['001008', '001005', '002474', '001262'];
    var basePath = "./static/videos";

    if (!targetDiv.hasChildNodes()) {
        var newDiv = document.createElement('div');
        newDiv.className = 'item';
        newDiv.id = button_idx;

        body_ids.forEach(body_id => {
            var videoSrc = `${basePath}/diversity/ours/${idx}_${body_id}.mp4`;
            appendVideoElement(newDiv, videoSrc, body_id=='body');
        });

        targetDiv.appendChild(newDiv);
        targetDiv.appendChild(document.createElement('br'));
    } else {
        var videos = targetDiv.querySelectorAll('video');
        body_ids.forEach((body_id, index) => {
            var videoSrc = `${basePath}/diversity/ours/${idx}_${body_id}.mp4`;
            if (index < videos.length) {
                let videoElement = videos[index];
                let sourceElement = videoElement.children[0];
                sourceElement.src = videoSrc;
                videoElement.load(); 
                videoElement.play().catch(error => {
                    console.error("Video play failed:", error);
                });
            } else {
                appendVideoElement(targetDiv, videoSrc, body_id=='body');
            }
        });
    }

    var img_btns = document.getElementsByClassName('btn-img-div');
    if(img_btns.length > 0){
        for(var i = 0; i < img_btns.length; i++) {
            set_inactive(img_btns[i]);
        }
        set_active(img_btns[button_idx]);
    }
}


function add_body_video(){
    var targetDiv = document.getElementById('body_video_block');
    var body_ids = ['001008', '001005', '002474', '001262'];
    var basePath = "./static/videos";

    var newDiv = document.createElement('div');
    newDiv.className = 'item';

    body_ids.forEach(body_id => {
        var videoSrc = `${basePath}/diversity/body/body_${body_id}.mp4`;
        appendVideoElement(newDiv, videoSrc, false, false, true);
    });

    targetDiv.appendChild(newDiv);
    targetDiv.appendChild(document.createElement('br'));
}

let shape={
    "000019": "A person with these dimensions: 164 cm tall, chest 102 cm, waist 89 cm, hips 107 cm, arm 51 cm, and leg height 70 cm.",
    "000066": "You see a person whose physical stature includes a height of 196 cm. Notable measurements are a chest circumference of 114 cm, waist circumference of 101 cm, and hip circumference of 105 cm, with a arm length of 61 cm and leg height of 83 cm.",
    "000085": "Here is a male with a height of 194 cm. Their measurements are as follows: chest 109 cm, waist 103 cm, and hips 104 cm. The lengths of the arm and legs are 59 cm and 81 cm respectively.",
    "000086": "Consider a person who is 165 cm tall. They have a chest of 99 cm, waist of 88 cm, and hips of 103 cm. Their arm is 50 cm long, and their legs measure 67 cm in height.",
    "000099": "This individual, a person, has a height of 172 cm. Their body measurements include a chest of 91 cm, a waist of 73 cm, and hips measuring 92 cm. The arm extends 54 cm and the legs are 73 cm long.",
    "000285": "Profile of a male: Height of 177 cm, with a chest measurement of 112 cm, waist of 105 cm, and hips spanning 107 cm. The arm and leg heights are 55 cm and 73 cm, respectively.",
    "000296": "This individual, a female, has a height of 168 cm. Their body measurements include a chest of 102 cm, a waist of 85 cm, and hips measuring 103 cm. The arm extends 48 cm and the legs are 71 cm long.",
    "000337": "A person with these dimensions: 175 cm tall, chest 108 cm, waist 96 cm, hips 116 cm, arm 53 cm, and leg height 76 cm.",
    "000343": "Here is a female with a height of 167 cm. Their measurements are as follows: chest 91 cm, waist 78 cm, and hips 100 cm. The lengths of the arm and legs are 51 cm and 69 cm respectively.",
    "000556": "Here is a man with a height of 194 cm. Their measurements are as follows: chest 109 cm, waist 103 cm, and hips 104 cm. The lengths of the arm and legs are 59 cm and 81 cm respectively.",
    "000710": "Consider a man who is 182 cm tall. They have a chest of 101 cm, waist of 90 cm, and hips of 96 cm. Their arm is 56 cm long, and their legs measure 77 cm in height.",
    "000862": "A detailed look at a man: They stand 187 cm tall, and feature a chest of 102 cm, a waist of 94 cm, and hips measuring 97 cm. Their arm length is 57 cm, and the leg height is 77 cm.",
    "000865": "The person stands 182 cm tall. They have a chest circumference of 102 cm, a waist of 92 cm, and hips that measure 95 cm. The arm and leg measurements are 53 cm and 73 cm, respectively.",
    "000904": "Profile of a male: Height of 185 cm, with a chest measurement of 100 cm, waist of 87 cm, and hips spanning 94 cm. The arm and leg heights are 55 cm and 74 cm, respectively.",
    "001005": "You see a man whose physical stature includes a height of 185 cm. Notable measurements are a chest circumference of 100 cm, waist circumference of 87 cm, and hip circumference of 94 cm, with a arm length of 55 cm and leg height of 74 cm.",
    "001008": "Here is a male with a height of 196 cm. Their measurements are as follows: chest 114 cm, waist 101 cm, and hips 105 cm. The lengths of the arm and legs are 61 cm and 83 cm respectively.",
    "001009": "This individual, a female, has a height of 169 cm. Their body measurements include a chest of 101 cm, a waist of 88 cm, and hips measuring 105 cm. The arm extends 51 cm and the legs are 72 cm long.",
    "001113": "You see a man whose physical stature includes a height of 180 cm. Notable measurements are a chest circumference of 106 cm, waist circumference of 100 cm, and hip circumference of 96 cm, with a arm length of 56 cm and leg height of 76 cm.",
    "001282": "Here is a woman with a height of 160 cm. Their measurements are as follows: chest 96 cm, waist 81 cm, and hips 99 cm. The lengths of the arm and legs are 49 cm and 69 cm respectively.",
    "001592": "Profile of a man: Height of 180 cm, with a chest measurement of 106 cm, waist of 100 cm, and hips spanning 96 cm. The arm and leg heights are 56 cm and 76 cm, respectively.",
    "001603": "The person stands 170 cm tall. They have a chest circumference of 104 cm, a waist of 88 cm, and hips that measure 90 cm. The arm and leg measurements are 51 cm and 66 cm, respectively.",
    "001888": "Consider a male who is 180 cm tall. They have a chest of 106 cm, waist of 100 cm, and hips of 96 cm. Their arm is 56 cm long, and their legs measure 76 cm in height.",
    "001976": "A man with these dimensions: 190 cm tall, chest 103 cm, waist 96 cm, hips 96 cm, arm 56 cm, and leg height 79 cm.",
    "002074": "A detailed look at a man: They stand 184 cm tall, and feature a chest of 108 cm, a waist of 100 cm, and hips measuring 102 cm. Their arm length is 54 cm, and the leg height is 74 cm.",
    "002082": "Consider a person who is 163 cm tall. They have a chest of 140 cm, waist of 128 cm, and hips of 117 cm. Their arm is 49 cm long, and their legs measure 66 cm in height.",
    "002091": "The female stands 158 cm tall. They have a chest circumference of 95 cm, a waist of 79 cm, and hips that measure 88 cm. The arm and leg measurements are 48 cm and 67 cm, respectively.",
    "002103": "Consider a person who is 174 cm tall. They have a chest of 95 cm, waist of 86 cm, and hips of 103 cm. Their arm is 53 cm long, and their legs measure 73 cm in height.",
    "002246": "You see a male whose physical stature includes a height of 171 cm. Notable measurements are a chest circumference of 102 cm, waist circumference of 93 cm, and hip circumference of 94 cm, with a arm length of 54 cm and leg height of 69 cm.",
    "002474": "Here is a woman with a height of 168 cm. Their measurements are as follows: chest 108 cm, waist 98 cm, and hips 104 cm. The lengths of the arm and legs are 52 cm and 72 cm respectively.",
    "002718": "Here is a person with a height of 168 cm. Their measurements are as follows: chest 102 cm, waist 85 cm, and hips 103 cm. The lengths of the arm and legs are 48 cm and 71 cm respectively.",
    "002750": "A male standing 180 cm tall, with a chest circumference of 106 cm, waist circumference of 100 cm, and hip circumference of 96 cm. The length of the arm is 56 cm and leg height is 76 cm.",
    "003138": "Here is a man with a height of 180 cm. Their measurements are as follows: chest 108 cm, waist 96 cm, and hips 98 cm. The lengths of the arm and legs are 53 cm and 73 cm respectively."
}

let motion={
    "000019": "person jogs around to the left and right",
    "000066": "a man stands up, walks clock-wise in a circle, then sits back down.",
    "000085": "using their left hand, the person holds the neck of an air guitar, and with their right hand, they make strumming motions.",
    "000086": "a person is holding his arms straight out to the sides then lowers them, claps, and steps forward to sit in a chair",
    "000099": "a person jogs in place",
    "000285": "a person walks casually forward, appearing to walk down four steps. their shoulders are neutral. both feed come together at the bottom.",
    "000296": "someone working out the right arm",
    "000337": "a person walks down stairs while holding a railing with his right hand.",
    "000343": "the person takes side steps to his right then side steps to his left.",
    "000556": "a person appears to be doing a dance.",
    "000710": "a person walks forward while twisting their torso side to side.",
    "000862": "a man takes two steps forward and turns back",
    "000865": "the person is preforming a swimming stroke know as the butterfly stroke.  the arms swing from behind the head and reenter the water propelling the person forward.",
    "000904": "a person jogs forward and semi circles around to the right and then to the left.",
    "001005": "a person touches each elbow to the opposite knee then spreads his legs and starts to do squats.",
    "001008": "a person walks forward then turns completely around and does a cartwheel.",
    "001009": "person bends to pick up something approximately knee high on right side with right hand. he rotates to the left and takes that object and rubs it against something before returning it.",
    "001113": "he is leaning on something and cleaning it with a towel.",
    "001282": "stick person is spinning in circles with arms flaling around and hopping or skippinh to the left",
    "001592": "a person does a small jump",
    "001603": "a person walks forward then upwards.",
    "001888": "the person is kneeling down on all fours to begin to crawl",
    "001976": "a person casually struts in a clockwise oval almost back to their original position, swinging their arms lightly at their side as they walk.",
    "002074": "person is takign something throwing it then backing up.",
    "002082": "a man runs forward without stopping.",
    "002091": "the person swings both arms, squats, and jumps while turning 45 degrees to his left before landing.",
    "002103": "a man steps forward and does a handstand.",
    "002246": "a person walks up stairs turns left and walks back down stairs.",
    "002474": "a person jumps on the spot and is pushed forward.",
    "002718": "a person lunges forward bending their left knee and elbow.",
    "002750": "a man supports himself with his right hand, carefully going down to his knees.",
    "003138": "a person opens a door and appears to be swimming."
}