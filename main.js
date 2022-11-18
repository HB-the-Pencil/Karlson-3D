<!DOCTYPE html><html><!--

  
  
  
  karlson 3d but its actually better than those ripoff unity ones, coded from scratch with webgl
  
  
  
  
  
  
  
  
  
  
  


How to use the level creator:

RESTARTING THE PROGRAM DELETES THE LEVEL YOU'VE WORKED ON

INPUTTING AN INVALID CODE CAUSES THE PROGRAM TO CRASH(you have to reset the program again)

If you would like to edit a saved level, or load a level using data, press "I" while in the level creator and input the code. Note that the level you made before inputting the code will be deleted and changed to the level determined by the code.


To navigate,use the WASD keys. Because the movement is free, the SHIFT and SPACE keys allow you to move up and down. To rotate your camera, position your mouse on the screen(the display part,not the control panel) and drag.

To select a part to motify,press the select part button. The part hilighted after pressing the button is the part selected. To select a specific part, you may need to press several times. Right clicking selects the parts in backwards order.

To motify a part, pick something you want to change. If the setting you want to change is a number,hover your mouse over the numbers and press the "O" and "L" keys to increase or decrease. To slow down or speed up the rate of which the numbers change,hold down the "A" or "Z" keys while also pressing the "O" or "L" keys. The "A" key speeds up while the "Z" key slows down. To round the number,press "R". If you want to enable or disable a setting,click on the little box. If you wish to change a type,simply click on the text to change to a new type. To delete a part,click on the delete button located at the lower left corner of the screen.

To save a level you made,click on the "Save" button at the top left of the screen and make sure to copy the code given.

To play a saved level(if you have the code),press the "Input Code" button while in the level select screen and paste the code into the input box,then press "Load".

If you would like to edit a saved level,press "I" while in the level creator and input the code. Note that the level you made before inputting the code will be deleted and changed to the level determined by the code.

To exit the level creator,press "T". This action saves whatever level you have made.

The yellow,blue,and red cubes represent the light source,the milk,and the player spawn position. You can move them by setting their positions


PARTICLE SYSTEM:

First of all: the particles always spawn in the black box randomly. You can see the black box in the level editor but it'll only show if the particle system is selected


The particle system allows for a pretty wide range of things,with just a "few" settings!

We have: Min Vel X,Max Vel X,Min Vel Y,Max Vel Y,Min Vel Z,Max Vel Z,Min R,Max R,Min G,Max G,Min B,Max B,Min Life,Max Life,Gravity,Min Size,Max Size,Production Rate,and finnaly,Batch Amount

Min means minimun,and max means maximum. Particles spawned will be in the range of these settings(random numbers between these settings are picked). For example,with a min size of 10 and a max size of 30,particles produced will have a size over 10 and less than 30. Vel means starting velocity,R,G,B means the RGB colors of the particles,and the life is the lifespan of the particles(7.5 lifespan is about 1 sec but idk). The gravity is constant for all particles from the same system,and so is the production rate. The production rate is actually the production delay. For example,a production rate of 10 means that a particle will spawn every 10 frames. A frame is 1/60 of a second,assuming your computer is good enough. Batch amount is basically the amount of particles spawned when the system produces(every production tick). Finally,performance. The game can handle particles very well. like 25 systems each with 6 delay still runs 60 fps on a potato computer!!!

I honestly expected wayyyyy worse performance
Also sadly particles are not affected by physics so they can go through walls and stuffz. Adding this will lower performance dramatically,but they do fly off near an explosion,so they r cool

Also systems might break if the min value is over the max value but I don't think it'll happen due to the interpolation stuff

also I cleary quickly ran out of space to put all these settings so now you can click on the giant arrow to go to the next page

also because the particles use ALOT of the Math.random() functions I'm a bit worried about the function's performance but obviously still way too lazy to check 



Notes: 

    There are limits on how much you can change numbers. For example,The position of a shape can be any number but the rotation angles of a shape are locked to 0-360.
    
    The meshes displayed in the level creator may not represent the actual object(if the object is not a wall). For example,weapons will show up as gray boxes,and spheres show up as regular cubes. These will be displayed normally inside the game.
    
    Because the physics computations are expensive,try to make smaller levels(around 100 walls might lag) and reduce the amount of enemies in them(7 ragdolls causes lag on a potato computer,and ragdolls are made up of 6 blocks).

    Fun fact: you used to be able to speed up the rate that numbers change in the level creator by using SHIFT and CTRL,but they caused problems because CTRL+O apperantly opens your files and CTRL+L jumps to the search bar, so I changed them 


-->



<title>Karlson [3D]</title>

<canvas id='gl-canvas'></canvas>
<canvas id='ui-canvas'></canvas>
<canvas id='board-canvas' width='800' height='1500'></canvas>

<style>
    
    body {
        
        margin:0;
        overflow:hidden;
        font-family:cursive;
    }
    
    #gl-canvas {
        
        display:none;
    }
    
    #board-canvas {
        
        display:none;
    }
    
    #ui-canvas {
        
        position:fixed;
        z-index:-1;
    }
    
    .page {
        
        display:none;
        color:rgb(255,255,255);
        padding:20px;
        z-index:1;
    }
    
    input {
        
        height:24px;
        outline:none;
        background-color:rgb(255,255,255);
        border:none;
        border-bottom:4px solid black;
        transition-duration:0.4s;
        border-radius:5px;
    }
    
    input:hover {
        
        background-color:rgb(200,200,255);
    }
    
    input:focus {
        
        background-color:rgb(170,200,255);
    }
    
    textarea {
        
        height:240px;
        outline:none;
        background-color:rgb(255,255,255);
        border:none;
        border-bottom:4px solid black;
        transition-duration:0.4s;
        border-radius:5px;
    }
    
    textarea:hover {
        
        background-color:rgb(200,200,255);
    }
    
    textarea:focus {
        
        background-color:rgb(170,200,255);
    }
    
    button {
        
        width:60px;
        height:30px;
        transition-duration:0.4s;
        border-radius:8px;
        font-size:16px;
        background-color:rgb(255,255,255);
    }
    
    button:hover {
        
        cursor:pointer;
        border-radius:13px;
        background-color:rgb(150,255,205);
    }
    
    
</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src='https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js'></script>

<script src='https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js'></script>

<script id='static_geometry_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    uniform vec3 lightPos;
    
    in vec3 vertPos;
    in vec3 vertColor;
    in vec2 vertTexCoord;
    in vec3 vertNormal;
    
    out vec3 pixPos;
    out vec3 pixColor;
    out vec2 pixTexCoord;
    out vec3 pixNormal;
    
    void main(){
        
        vec3 diffuse_vertColor=vertColor*max((dot(normalize(lightPos-vertPos),vertNormal)*0.5+0.5)*0.5,0.2)*3.0;
        
        pixPos=vertPos.xyz;
        pixColor=diffuse_vertColor;
        pixTexCoord=vertTexCoord;
        pixNormal=vertNormal;
        
        gl_Position=viewMatrix*vec4(vertPos,1);
    }
    
</script>

<script id='static_geometry_fsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform sampler2D tex;
    uniform vec3 lightPos;
    uniform vec3 playerPos;
    uniform float alpha;
    
    in vec3 pixPos;
    in vec3 pixColor;
    in vec2 pixTexCoord;
    in vec3 pixNormal;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        vec3 normal=normalize(pixNormal);
        vec3 toCam=normalize(playerPos-pixPos);
        vec3 toLight=normalize(lightPos-pixPos);
        vec3 halfVec=normalize(toCam+toLight);
        
        float specular=0.0;
        
        if(dot(normal,toLight)>-0.5){
            
            specular=dot(halfVec,normal);
            specular*=specular;
            specular*=specular;
            specular*=specular;
            specular*=specular;
            specular*=specular;
        }
        
        float refl=max(0.4-dot(toCam,normal),0.0);
        
        fragColor=vec4(pixColor+texture(tex,pixTexCoord).rgb,alpha);
        fragInfo=vec4(0,specular*0.5+refl,(gl_FragCoord.z/gl_FragCoord.w)*0.01,1);
        fragNormal=vec4(normal*0.5+0.5,1.0);
    }
    
</script>

<script id='dynamic_geometry_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    uniform vec3 lightPos;
    uniform mat4 modelMatrix;
    
    in vec3 vertPos;
    in vec3 vertColor;
    in vec3 vertNormal;
    
    out vec3 pixPos;
    out vec3 pixColor;
    out vec3 pixNormal;
    
    void main(){
        
        vec4 transformedPosition=modelMatrix*vec4(vertPos,1);
        
        vec3 transformedNormal=normalize(mat3(modelMatrix)*vertNormal);
        
        vec3 diffuse_vertColor=vertColor*max((dot(normalize(lightPos-transformedPosition.xyz),transformedNormal)*0.5+0.5)*0.5,0.2)*3.0;
        
        pixPos=transformedPosition.xyz;
        pixColor=diffuse_vertColor;
        pixNormal=transformedNormal;
        
        gl_Position=viewMatrix*transformedPosition;
    }
    
</script>

<script id='dynamic_geometry_fsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform vec3 lightPos;
    uniform vec3 playerPos;
    
    in vec3 pixPos;
    in vec3 pixColor;
    in vec3 pixNormal;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        vec3 normal=normalize(pixNormal);
        vec3 toCam=normalize(playerPos-pixPos);
        vec3 toLight=normalize(lightPos-pixPos);
        vec3 halfVec=normalize(toCam+toLight);
        
        float specular=0.0;
        
        if(dot(normal,toLight)>-0.5){
            
            specular=dot(halfVec,normal);
            specular*=specular;
            specular*=specular;
            specular*=specular;
            specular*=specular;
            specular*=specular;
        }
        
        fragColor=vec4(pixColor,1);
        fragInfo=vec4(0,specular*0.5,(gl_FragCoord.z/gl_FragCoord.w)*0.01,1);
        fragNormal=vec4(normal*0.5+0.5,1.0);
    }
    
</script>

<script id='line_renderer_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    uniform vec2 thickness;
    
    in vec3 vertPos;
    
    out float lineT;
    
    void main(){
        
        lineT=vertPos.z+0.5;
        vec3 pos=vertPos;
        
        if(pos.z<0.0){
            
            pos.x*=thickness.x;
            pos.y*=thickness.x;
            
        } else {
            
            pos.x*=thickness.y;
            pos.y*=thickness.y;
        }
        
        gl_Position=viewMatrix*modelMatrix*vec4(pos,1);
    }
    
</script>

<script id='line_renderer_fsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform vec4 lineColor1;
    uniform vec4 lineColor2;
    
    in float lineT;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        fragColor=mix(lineColor1,lineColor2,lineT);
        fragInfo=vec4(0,0,(gl_FragCoord.z/gl_FragCoord.w)*0.01,1);
        fragNormal=vec4(0,0,0,0);
    }
    
</script>

<script id='weapon_renderer_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    uniform vec3 lightPos;
    uniform mat4 modelMatrix;
    uniform vec3 offset;
    uniform float reloadAngle;
    
    in vec3 vertPos;
    in vec3 vertColor;
    in vec3 vertNormal;
    
    out vec3 pixPos;
    out vec3 pixColor;
    out vec3 pixNormal;
    
    void main(){
        
        vec3 rotatedVertPos=vertPos;
        float sinTheta=sin(reloadAngle);
        float cosTheta=cos(reloadAngle);
        
        rotatedVertPos=vec3(rotatedVertPos.x,
        
        rotatedVertPos.y*cosTheta-rotatedVertPos.z*sinTheta,
        rotatedVertPos.y*sinTheta+rotatedVertPos.z*cosTheta);
        
        vec4 transformedPosition=modelMatrix*vec4(rotatedVertPos+offset,1);
        
        vec3 transformedNormal=normalize(mat3(modelMatrix)*vertNormal);
        
        vec3 diffuse_vertColor=vertColor*max((dot(normalize(lightPos-transformedPosition.xyz),transformedNormal)*0.5+0.5)*0.5,0.2)*3.0;
        
        pixPos=transformedPosition.xyz;
        pixColor=diffuse_vertColor;
        pixNormal=transformedNormal;
        
        gl_Position=viewMatrix*transformedPosition;
    }
    
</script>

<script id='weapon_renderer_fsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform vec3 lightPos;
    uniform vec3 playerPos;
    
    in vec3 pixPos;
    in vec3 pixColor;
    in vec3 pixNormal;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        vec3 normal=normalize(pixNormal);
        vec3 toCam=normalize(playerPos-pixPos);
        vec3 toLight=normalize(lightPos-pixPos);
        vec3 halfVec=normalize(toCam+toLight);
        
        float specular=0.0;
        
        if(dot(normal,toLight)>-0.5){
            
            specular=dot(halfVec,normal);
            specular*=specular;
            specular*=specular;
            specular*=specular;
            specular*=specular;
            specular*=specular;
        }
        
        fragColor=vec4(pixColor,1);
        fragInfo=vec4(0,specular*0.5,(gl_FragCoord.z/gl_FragCoord.w)*0.01,1);
        fragNormal=vec4(normal*0.5+0.5,1.0);
    }
    
</script>

<script id='board_geometry_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    
    in vec3 vertPos;
    in vec2 vertTexCoord;
    
    out vec2 pixTexCoord;
    
    void main(){
        
        pixTexCoord=vertTexCoord;
        
        gl_Position=viewMatrix*vec4(vertPos,1);
    }
    
</script>

<script id='board_geometry_fsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform sampler2D tex;
    
    in vec2 pixTexCoord;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        vec4 col=texture(tex,pixTexCoord);
        
        if(col.a<=0.0){
            
            discard;
        }
        
        fragColor=vec4(col);
        fragInfo=vec4(0,0,(gl_FragCoord.z/gl_FragCoord.w)*0.01,1);
        fragNormal=vec4(0,0,0,0);
    }
    
</script>

<script id='particle_renderer_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    
    in vec3 vertPos;
    in vec3 vertColor;
    in float vertSize;
    in float vertRot;
    
    out float particleSize;
    out vec2 particlePos;
    out vec3 pixColor;
    out vec2 particleRot;
    
    void main(){
        
        vec4 pos=viewMatrix*vec4(vertPos,1);
        pixColor=vertColor;
        particlePos=pos.xy/pos.w;
        gl_Position=pos;
        float projSize=(vertSize/pos.z)*1.5;
        gl_PointSize=projSize;
        particleSize=projSize*0.5;
        particleRot=vec2(sin(vertRot),cos(vertRot));
        
    }
    
</script>

<script id='particle_renderer_fsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    in float particleSize;
    in vec2 particlePos;
    in vec3 pixColor;
    in vec2 particleRot;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        vec2 ssPos=(gl_FragCoord.xy-vec2(HALF_WIDTH,HALF_HEIGHT))*vec2(INV_HALF_WIDTH,INV_HALF_HEIGHT);
        vec2 del=particlePos-ssPos;
        
        del=vec2(
            
            del.x*particleRot.x-del.y*particleRot.y,
            del.x*particleRot.y+del.y*particleRot.x
            
        );
        
        if(abs(del.x)+abs(del.y)>particleSize*INV_AVG_HALF_WIDTH_HEIGHT){
            
            discard;
        }
        
        fragColor=vec4(pixColor,1);
        fragInfo=vec4(0,0,(gl_FragCoord.z/gl_FragCoord.w)*0.01,1);
        fragNormal=vec4(0,0,0,0);
    }
    
</script>

<script id='postprocessing_vsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in vec2 screenVerts;
    
    out vec2 pixTexCoord;
    
    void main(){
        
        pixTexCoord=screenVerts*0.5+0.5;
        gl_Position=vec4(screenVerts,0,1.0);
    }
    
</script>

<script id='sky_renderer_vsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    uniform vec2 screenTranslation;
    
    in vec2 vertPos;
    in float vertIsSun;
    
    out float isSun;
    
    void main(){
        
        isSun=vertIsSun;
        gl_Position=vec4(vertPos+screenTranslation,1,1);
    }
    
</script>

<script id='sky_renderer_fsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in float isSun;
    
    layout(location=0) out vec4 fragColor;
    layout(location=1) out vec4 fragInfo;
    layout(location=2) out vec4 fragNormal;
    
    void main(){
        
        fragColor=vec4(0,0,0,0);
        fragInfo=vec4(isSun,0,0,1);
        fragNormal=vec4(0,0,0,0);
    }
    
</script>

<script id='sunray_fsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in vec2 pixTexCoord;
    
    uniform sampler2D inputTex;
    uniform vec2 sunPos;
    
    out vec4 fragLuminace;
    
    vec3 sunrays(float density,float weight,float decay,float exposure,int numSamples,sampler2D occlusionTexture,vec2 screenSpaceLightPos,vec2 uv){
        
        vec3 fragColor=vec3(0.0,0.0,0.0);
        
        vec2 deltaTextCoord=vec2(uv-screenSpaceLightPos.xy);
      
        vec2 textCoo=uv.xy;
        deltaTextCoord*=(1.0/float(numSamples))*density;
        float illuminationDecay = 1.0;
        
        for(int i=0;i<numSamples;i++){
            
            textCoo-=deltaTextCoord;
        	vec3 samp=texture(occlusionTexture,textCoo).xxx;
            samp*=illuminationDecay*weight;
            fragColor+=samp;
            illuminationDecay*=decay;
        }
        
        fragColor*=exposure;
        
        return fragColor;
    }
    
    void main(){
        
        vec3 col=sunrays(1.0,0.02,1.0,1.0,50,inputTex,sunPos*0.5+0.5,pixTexCoord);
        
        fragLuminace=vec4(col,1);
    }
    
</script>

<script id='bloom_filter_fsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in vec2 pixTexCoord;
    
    uniform sampler2D inputTex;
    
    out vec4 fragColor;
    
    void main(){
        
        vec3 col=texture(inputTex,pixTexCoord).rgb;
        
        if(length(col)>0.9){
            
            fragColor=vec4(col*0.4,1);
            
        } else {
            
            fragColor=vec4(0,0,0,1);
        }
        
    }
    
</script>

<script id='bloom_blur_hor_fsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in vec2 pixTexCoord;
    
    uniform sampler2D inputTex;
    
    out vec4 fragColor;
    
    void main(){
        
        vec3 c=vec3(0);
        
        int blurAmount=5;
        float blurSpread=0.00168;
        
        for(int i=-blurAmount;i<=blurAmount;i++){
            
            c+=texture(inputTex,vec2(i,0)*blurSpread+pixTexCoord).rgb;
        }
        
        c*=0.1;
        
		fragColor=vec4(c,1);
    }
    
</script>

<script id='bloom_blur_ver_fsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in vec2 pixTexCoord;
    
    uniform sampler2D inputTex;
    
    out vec4 fragColor;
    
    void main(){
        
        vec3 c=vec3(0);
        
        int blurAmount=5;
        float blurSpread=0.00168;
        
        for(int i=-blurAmount;i<=blurAmount;i++){
            
            c+=texture(inputTex,vec2(0,i)*blurSpread+pixTexCoord).rgb;
        }
        
        c*=0.1;
        
		fragColor=vec4(c,1);
    }
    
</script>

<script id='ssao_fsh' type='GLSLPostprocessing'>

    #version 300 es
    
    precision lowp float;
    
    in vec2 pixTexCoord;
    
    uniform sampler2D normalTex;
    
    out vec4 fragOcclusion;
    
    void main(){
        
        float am=0.0;
        
        vec4 sampledNormal=texture(normalTex,pixTexCoord);
        
        if(sampledNormal.a>0.01){
            
            vec3 pixNormal=sampledNormal.xyz*2.0-1.0;
            
            for(int x=-7;x<=7;x+=2){
                
                for(int y=-7;y<=7;y+=2){
                    
                    vec2 sam=vec2(x,y)*0.003;
                    vec4 sampleNormal=texture(normalTex,pixTexCoord+sam);
                    if(sampleNormal.a>0.01){
                        
                        am+=1.0-(dot(pixNormal,sampleNormal.xyz*2.0-1.0));
                    }
                }
            }
            
            am*=0.009;
            am-=0.05;
        
        } else {
            
            am=0.0;
        }
        
        fragOcclusion=vec4(am,am,am,1);
        
    }
    
</script>

<script id='fxaa_fsh' type='GLSLPostprocessing'>
    
    #version 300 es
    
    precision lowp float;
    
    in vec2 pixTexCoord;
    
    uniform sampler2D tex;
    
    out vec4 fragColor;
    
    #define FXAA_SPAN_MAX 3.0
    #define FXAA_REDUCE_MUL 0.5
    #define FXAA_REDUCE_MIN 0.4
    #define FXAA_SUBPIX_SHIFT 0.5
    
    vec3 fxaaPixelShader(vec4 uv,sampler2D tex,vec2 rcpFrame){
        
        vec3 rgbNW=texture(tex,uv.zw).xyz;
        vec3 rgbNE=texture(tex,uv.zw+vec2(1,0)*rcpFrame.xy).xyz;
        vec3 rgbSW=texture(tex,uv.zw+vec2(0,1)*rcpFrame.xy).xyz;
        vec3 rgbSE=texture(tex,uv.zw+vec2(1,1)*rcpFrame.xy).xyz;
        vec3 rgbM=texture(tex,uv.xy).xyz;
    
        vec3 luma=vec3(0.299,0.587,0.114);
        float lumaNW=dot(rgbNW,luma);
        float lumaNE=dot(rgbNE,luma);
        float lumaSW=dot(rgbSW,luma);
        float lumaSE=dot(rgbSE,luma);
        float lumaM=dot(rgbM,luma);
    
        float lumaMin=min(lumaM,min(min(lumaNW,lumaNE),min(lumaSW,lumaSE)))*0.75;
        float lumaMax=max(lumaM,max(max(lumaNW,lumaNE),max(lumaSW,lumaSE)))*1.25;
        
        vec2 dir=vec2((lumaSW+lumaSE)-(lumaNW+lumaNE),(lumaNW+lumaSW)-(lumaNE+lumaSE));
        
        float dirReduce=max((lumaNW+lumaNE+lumaSW+lumaSE)*FXAA_REDUCE_MUL,FXAA_REDUCE_MIN);
        float rcpDirMin=1.5/(min(abs(dir.x),abs(dir.y))+dirReduce);
        dir=min(vec2(FXAA_SPAN_MAX,FXAA_SPAN_MAX),max(vec2(-FXAA_SPAN_MAX,-FXAA_SPAN_MAX),dir*rcpDirMin))*rcpFrame.xy*0.5;
    
        vec3 rgbA=0.5*(texture(tex,uv.xy+dir*-0.16666667).xyz +texture(tex,uv.xy+dir*-0.16666667).xyz);
        vec3 rgbB=rgbA*0.5+0.25*(texture(tex,uv.xy-dir).xyz+texture(tex,uv.xy+dir).xyz);
        
        float lumaB=dot(rgbB,luma);
    
        if(lumaB<lumaMin || lumaB>lumaMax) return rgbA;
        
        return rgbB; 
    }
    
    void main(){
        
        vec2 rcpFrame=vec2(INV_HALF_WIDTH,INV_HALF_HEIGHT)*2.0;
      	vec2 uv2=pixTexCoord;
        
	   	vec4 uv=vec4(uv2,uv2-(rcpFrame*FXAA_SUBPIX_SHIFT));
	    vec3 col=fxaaPixelShader(uv,tex,rcpFrame);
        
        fragColor=vec4(col,1);
    }
    
</script>

<!--this standard combine shader not used anymore,later defined in the super secret shaders-->
<!--<script id='bloom_combine_fsh' type='GLSLPostprocessing'>#version 300 es-->
    
<!--    precision lowp float;-->
    
<!--    in vec2 pixTexCoord;-->
    
<!--    uniform sampler2D ogTex;-->
<!--    uniform sampler2D bloomTex;-->
<!--    uniform sampler2D sunrayTex;-->
<!--    uniform sampler2D infoTex;-->
<!--    uniform sampler2D ssaoTex;-->
    
<!--    out vec4 fragColor;-->
    
<!--    void main(){-->
        
<!--		fragColor=vec4((texture(ogTex,pixTexCoord).rgb+texture(bloomTex,pixTexCoord).rgb+texture(sunrayTex,pixTexCoord).rgb+texture(infoTex,pixTexCoord).ggg)*(1.0-texture(ssaoTex,pixTexCoord).rgb),1);-->
<!--    }-->
    
<!--</script>-->

<div class='page'>
    
    <p>Input level code here</p>
    <p style='margin:5px;font-size:10px;'>Press 'b' to go back</p>
    <textarea id='levelDataInput' type='text' cols='65' spellcheck='false' placeholder='Data'></textarea>
    <button id='runLevelDataCode'>Load</button>
    
</div>

<div class="page">
    
    <header style='margin-left:150px;margin-bottom:40px;font-size:35px;'>Play in Fullscreen?</header>
    <p>Size or resolution of your screen</p>
    <input id='screenWidth' type='text' size='20' spellcheck='false' placeholder='Width'>
    <span style='margin:10px;display:block'></span>
    <input id='screenHeight' type='text' size='20' spellcheck='false' placeholder='Height'>
    <span style='display:block;margin-top:10px;'></span>
    <button id='runFullScreen'>Run</button>
    <span style='display:block;margin-top:50px;'></span>
    <button id='noFullScreen' style='margin-left:170px;width:200px;height:50px;'>No,thanks...</button>
    <p>omg dream the green minecraft guy did a face reveal but thats not the crazy part cuz like im the first person to realize he looks exactly like dani the guy that made the real karlson ayo lollll conspiracy thoery???<br><br>ayo after 2 hours i found an even better match cuz he looks like hans neiman the guy that got accused of cheating in a chess tournament ayo lollll????</p>
    
</div>

<p id='levelStringText' style="position:absolute;top:90px;z-index:1;font-size:3px;padding:10px"></p>

<script type='application/javascript'>

var _M=Math

function Karlson(){

let Math=_M

let loadLevelDataButton=document.getElementById('runLevelDataCode'),levelDataInput=document.getElementById('levelDataInput'),pages=document.getElementsByClassName('page'),enterLevelDataPage=pages[0],fullScreenPage=pages[1]

let webCode=''

function runForFullScreen(){
    
    if(webCode.length>1){
        
        let w=window.open()
        w.document.open()
        w.document.write(webCode.replaceAll('\u0040','').replaceAll('width=600,height=600','width='+document.getElementById('screenWidth').value+',height='+document.getElementById('screenHeight').value).replace('var _M=Math','var _M=Math\nwindow.thisProgramIsInFullScreen'))
        w.document.close()
        
        webCode=''
        
    } else {
        
        window.parent.raf=window.requestAnimationFrame(runForFullScreen)
    }
}
    
document.getElementById('runFullScreen').addEventListener('click',function(){
    
    let ID=4693121029947392,w=document.getElementById('screenWidth').value,h=document.getElementById('screenHeight').value,nums='0123456789'
    
    for(let i in w.toString()){
        
        if(!nums.includes(w[i])){
            
            w=false
            break
        }
    }
    
    for(let i in h.toString()){
        
        if(!nums.includes(h[i])){
            
            h=false
            break
        }
    }
    
    if(!Number(w)||!Number(h)){
        
        alert('Screen size is not valid!')
        return
    }
    
    $.getJSON("https://www.khanacademy.org/api/labs/scratchpads/"+ID+"?callback=?",function(data){
        
      webCode=data.revision.code;
      
    })
    
    runForFullScreen()
})

document.getElementById('noFullScreen').addEventListener('click',function(){
    
    ctx.textAlign='start'
    fullScreenPage.style.display='none'
    currentScene='title'
    initTitleScreen()
    
})

//my screen res is approx 1366x662

let width=600,height=600,aspect=width/height,half_width=width*0.5,half_height=height*0.5

let glCanvas=document.getElementById('gl-canvas')
let uiCanvas=document.getElementById('ui-canvas')
let boardCanvas=document.getElementById('board-canvas')

glCanvas.width=width
glCanvas.height=height
uiCanvas.width=width
uiCanvas.height=height

let board_ctx=boardCanvas.getContext('2d')
let ctx=uiCanvas.getContext('2d')
let gl=glCanvas.getContext('webgl2',{antialias:true})

gl.canvas.width=width
gl.canvas.height=height

ctx.setTransform(width/600,0,0,height/600,0,0)

if(!gl){
    
    alert('No WebGL')
    return
}

let glCache={}

gl.viewport(0,0,width,height)

gl.enable(gl.BLEND)
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)

gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LEQUAL)
gl.enable(gl.CULL_FACE)
gl.cullFace(gl.BACK)

ctx.shadowOffsetX=0
ctx.shadowOffsetY=0
ctx.shadowBlur=9

let superSecretShaders=[
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){fragColor=vec4((texture(ogTex,pixTexCoord).rgb+texture(bloomTex,pixTexCoord).rgb+texture(sunrayTex,pixTexCoord).rgb+texture(infoTex,pixTexCoord).ggg)*(1.0-texture(ssaoTex,pixTexCoord).rgb),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ fragColor=vec4(1.0-texture(ssaoTex,pixTexCoord).rgb,1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ fragColor=vec4(texture(infoTex,pixTexCoord).bbb,1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ fragColor=vec4(texture(bloomTex,pixTexCoord).rgb,1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ float weight=max(sin(gl_FragCoord.x)*2.0*tan(gl_FragCoord.y*0.4),0.0); fragColor=vec4((texture(ogTex,pixTexCoord).rgb+texture(bloomTex,pixTexCoord).rgb+texture(sunrayTex,pixTexCoord).rgb+texture(infoTex,pixTexCoord).ggg)*(1.0-texture(ssaoTex,pixTexCoord).rgb)+weight,1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ vec2 ssPos=(gl_FragCoord.xy-300.0)/300.0;vec2 texCoord=vec2(pixTexCoord.x+sin(time*0.25+ssPos.y)*0.05,pixTexCoord.y+cos(time*0.25+ssPos.x)*0.05)*0.9; fragColor=vec4((texture(ogTex,texCoord).rgb+texture(bloomTex,texCoord).rgb+texture(sunrayTex,texCoord).rgb+texture(infoTex,texCoord).ggg)*(1.0-texture(ssaoTex,texCoord).rgb),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ float pixelate=100.0; vec2 texCoord=vec2(floor(pixTexCoord.x*pixelate)/pixelate,floor(pixTexCoord.y*pixelate)/pixelate); fragColor=vec4((texture(ogTex,texCoord).rgb+texture(bloomTex,texCoord).rgb+texture(sunrayTex,texCoord).rgb+texture(infoTex,texCoord).ggg)*(1.0-texture(ssaoTex,texCoord).rgb),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){  vec2 texCoord=pixTexCoord;  vec2 ssPos=(gl_FragCoord.xy-vec2(HALF_WIDTH,HALF_HEIGHT))*vec2(INV_HALF_WIDTH,INV_HALF_HEIGHT); float len=dot(ssPos,ssPos); texCoord-=0.5; texCoord*=0.75*exp(-len*len*0.25); texCoord+=0.5; fragColor=vec4((texture(ogTex,texCoord).rgb+texture(bloomTex,texCoord).rgb+texture(sunrayTex,texCoord).rgb+texture(infoTex,texCoord).ggg)*(1.0-texture(ssaoTex,texCoord).rgb),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ vec2 texCoord=pixTexCoord;texCoord-=0.5;texCoord*=(dot(texCoord,texCoord)-1.0)*0.4+1.3;texCoord+=0.5;vec3 col=(texture(ogTex,texCoord).rgb+texture(bloomTex,texCoord).rgb+texture(sunrayTex,texCoord).rgb+texture(infoTex,texCoord).ggg)*(1.0-texture(ssaoTex,texCoord).rgb); fragColor=vec4(vec3(col.r*0.299+col.g*0.587+col.b*0.114),1); }`,
        
    `#version 300 es
precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ vec2 texCoord=pixTexCoord;texCoord-=0.5;texCoord*=dot(texCoord,texCoord);texCoord+=0.5;fragColor=vec4((texture(ogTex,texCoord).rgb+texture(bloomTex,texCoord).rgb+texture(sunrayTex,texCoord).rgb+texture(infoTex,texCoord).ggg)*(1.0-texture(ssaoTex,texCoord).rgb),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ vec3 col=(texture(ogTex,pixTexCoord).rgb+texture(bloomTex,pixTexCoord).rgb+texture(sunrayTex,pixTexCoord).rgb+texture(infoTex,pixTexCoord).ggg)*(1.0-texture(ssaoTex,pixTexCoord).rgb); col=floor(col*2.0)/2.0;fragColor=vec4(col,1); }`,
    
    `#version 300 es
precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ vec2 texCoord=pixTexCoord; if(sin((gl_FragCoord.x+time)*0.1)<0.0){ texCoord.x=1.0-texCoord.x;}
fragColor=vec4((texture(ogTex,texCoord).rgb+texture(bloomTex,texCoord).rgb+texture(sunrayTex,texCoord).rgb+texture(infoTex,texCoord).ggg)*(1.0-texture(ssaoTex,texCoord).rgb),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; void main(){ fragColor=vec4(1.0-((texture(ogTex,pixTexCoord).rgb+texture(bloomTex,pixTexCoord).rgb+texture(sunrayTex,pixTexCoord).rgb+texture(infoTex,pixTexCoord).ggg)*(1.0-texture(ssaoTex,pixTexCoord).rgb)),1); }`,
    
    `#version 300 es
    precision lowp float; in vec2 pixTexCoord; uniform float time; uniform sampler2D ogTex; uniform sampler2D bloomTex; uniform sampler2D sunrayTex; uniform sampler2D infoTex; uniform sampler2D ssaoTex; out vec4 fragColor; vec2 hash(vec2 seed){return vec2(fract(sin(seed.x*123.34+time)*12309.032+133.013),fract(sin(seed.y*12.293-time)*5389.28*seed.x*2.23));}void main(){vec2 t=pixTexCoord+(hash(gl_FragCoord.xy)*2.0-1.0)*0.025;fragColor=vec4((texture(ogTex,t).rgb+texture(bloomTex,t).rgb+texture(sunrayTex,t).rgb+texture(infoTex,t).ggg)*(1.0-texture(ssaoTex,t).rgb),1); }`,

]

let currentSuperSecretShader=0

let backgroundColor=[0.4,0.6,0.8,1]

let physicsWorld=new CANNON.World()

physicsWorld.allowSleep=true

physicsWorld.broadphase=new CANNON.SAPBroadphase(physicsWorld)
physicsWorld.broadphase.useBoundingBoxes=true

physicsWorld.gravity.set(0,-1.5,0)

// physicsWorld.quatNormalizeSkip=2
// physicsWorld.quatNormalizeFast=true

let solver=new CANNON.GSSolver()

solver.iterations=2
solver.tolerance=100000

physicsWorld.solver=solver

let PLAYER_PHYSICS_GROUP=2,DYNAMIC_PHYSICS_GROUP=4,STATIC_PHYSICS_GROUP=8,ENEMY_PHYSICS_GROUP=16,LAVA_PHYSICS_GROUP=32

let roughMaterial=new CANNON.Material('roughMaterial'),
    slipperyMaterial=new CANNON.Material('slipperyMaterial'),
    bouncyMaterial=new CANNON.Material('bouncyMaterial'),
    billyMaterial=new CANNON.Material('billyMaterial'),
    rough_rough_contact=new CANNON.ContactMaterial(roughMaterial,roughMaterial,{
        
        friction:0.6,restitution:0.4
    }),
    rough_slippery_contact=new CANNON.ContactMaterial(roughMaterial,slipperyMaterial,{
        
        friction:0,restitution:0
    }),
    rough_bouncy_contact=new CANNON.ContactMaterial(roughMaterial,bouncyMaterial,{
        
        friction:0.7,restitution:1
    }),
    slippery_bouncy_contact=new CANNON.ContactMaterial(bouncyMaterial,slipperyMaterial,{
        
        friction:0,restitution:1
    }),
    bouncy_bouncy_contact=new CANNON.ContactMaterial(bouncyMaterial,bouncyMaterial,{
        
        friction:0.5,restitution:1
    }),
    billy_rough_contact=new CANNON.ContactMaterial(billyMaterial,roughMaterial,{
        
        friction:0.002,restitution:0.3
    }),
    billy_slippery_contact=new CANNON.ContactMaterial(billyMaterial,slipperyMaterial,{
        
        friction:0.5,restitution:0
    }),
    billy_bouncy_contact=new CANNON.ContactMaterial(billyMaterial,bouncyMaterial,{
        
        friction:0.6,restitution:1
    }),
    billy_billy_contact=new CANNON.ContactMaterial(billyMaterial,billyMaterial,{
        
        friction:0.3,restitution:0.4
    })
    
physicsWorld.addContactMaterial(rough_rough_contact)
physicsWorld.addContactMaterial(rough_slippery_contact)
physicsWorld.addContactMaterial(rough_bouncy_contact)
physicsWorld.addContactMaterial(slippery_bouncy_contact)
physicsWorld.addContactMaterial(bouncy_bouncy_contact)
physicsWorld.addContactMaterial(billy_rough_contact)
physicsWorld.addContactMaterial(billy_slippery_contact)
physicsWorld.addContactMaterial(billy_bouncy_contact)
physicsWorld.addContactMaterial(billy_billy_contact)


let NEG_Z=[0,0,-1]

let WeaponRenderingQ=(function(out){
    
    out.Q=[]
    
    out.add=function(type,matrix,offset,reloadAngle){
        
        out.Q.push({type:type,matrix:matrix,offset:offset,reloadAngle:reloadAngle||0})
    }
    
    out.render=function(){
        
        for(let i in out.Q){
            
            let d=out.Q[i]
            
            gl.bindBuffer(gl.ARRAY_BUFFER,meshes[d.type].vertBuffer)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes[d.type].indexBuffer)
            gl.vertexAttribPointer(glCache.weapon_vertPos,3,gl.FLOAT,gl.FALSE,36,0)
            gl.vertexAttribPointer(glCache.weapon_vertColor,3,gl.FLOAT,gl.FALSE,36,12)
            gl.vertexAttribPointer(glCache.weapon_vertNormal,3,gl.FLOAT,gl.FALSE,36,24)
            
            gl.uniform3f(glCache.weapon_offset,d.offset[0],d.offset[1],d.offset[2])
            gl.uniform1f(glCache.weapon_reloadAngle,d.reloadAngle)
            gl.uniformMatrix4fv(glCache.weapon_modelMatrix,gl.FALSE,d.matrix)
            gl.drawElements(gl.TRIANGLES,meshes[d.type].indexAmount,gl.UNSIGNED_SHORT,0)
    
        }
        
        out.Q=[]
        
    }
    
    return out
    
})({})

function createProgram(vsh,fsh){
    
    let p;
    
    if(fsh){
        
        let vshText=document.getElementById(vsh).text.trim().replaceAll('INV_AVG_HALF_WIDTH_HEIGHT',2/((width+height)*0.5)).replaceAll('INV_HALF_WIDTH',1/(width*0.5)).replaceAll('INV_HALF_HEIGHT',1/(height*0.5)).replaceAll('INV_WIDTH',1/width).replaceAll('INV_HEIGHT',1/height).replaceAll('HALF_WIDTH',width*0.5+0.0000001).replaceAll('HALF_HEIGHT',height*0.5+0.0000001)
        let fshText=document.getElementById(fsh).text.trim().replaceAll('INV_AVG_HALF_WIDTH_HEIGHT',2/((width+height)*0.5)).replaceAll('INV_HALF_WIDTH',1/(width*0.5)).replaceAll('INV_HALF_HEIGHT',1/(height*0.5)).replaceAll('INV_WIDTH',1/width).replaceAll('INV_HEIGHT',1/height).replaceAll('HALF_WIDTH',width*0.5+0.0000001).replaceAll('HALF_HEIGHT',height*0.5+0.0000001)
        
        vsh=gl.createShader(gl.VERTEX_SHADER)
        fsh=gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(vsh,vshText)
        gl.shaderSource(fsh,fshText)
        gl.compileShader(vsh)
        gl.compileShader(fsh)
        
        p=gl.createProgram()
        gl.attachShader(p,vsh)
        gl.attachShader(p,fsh)
        gl.linkProgram(p)
        
    } else {
        
        let vshText=document.getElementById('postprocessing_vsh').text.trim()
        let fshText=vsh.trim().replaceAll('INV_AVG_HALF_WIDTH_HEIGHT',2/((width+height)*0.5)).replaceAll('INV_HALF_WIDTH',1/(width*0.5)).replaceAll('INV_HALF_HEIGHT',1/(height*0.5)).replaceAll('INV_WIDTH',1/width).replaceAll('INV_HEIGHT',1/height).replaceAll('HALF_WIDTH',width*0.5+0.0000001).replaceAll('HALF_HEIGHT',height*0.5+0.0000001)
        
        vsh=gl.createShader(gl.VERTEX_SHADER)
        fsh=gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(vsh,vshText)
        gl.shaderSource(fsh,fshText)
        gl.compileShader(vsh)
        gl.compileShader(fsh)
        
        p=gl.createProgram()
        gl.attachShader(p,vsh)
        gl.attachShader(p,fsh)
        gl.linkProgram(p)
        
    }
    
    return p
}

let staticGeometryProgram=createProgram('static_geometry_vsh','static_geometry_fsh')
let dynamicGeometryProgram=createProgram('dynamic_geometry_vsh','dynamic_geometry_fsh')
let lineRendererProgram=createProgram('line_renderer_vsh','line_renderer_fsh')
let weaponRendererProgram=createProgram('weapon_renderer_vsh','weapon_renderer_fsh')
let boardGeometryProgram=createProgram('board_geometry_vsh','board_geometry_fsh')
let particleRendererProgram=createProgram('particle_renderer_vsh','particle_renderer_fsh')

let bloomFilterProgram=createProgram('postprocessing_vsh','bloom_filter_fsh')
let bloomBlurHorProgram=createProgram('postprocessing_vsh','bloom_blur_hor_fsh')
let bloomBlurVerProgram=createProgram('postprocessing_vsh','bloom_blur_ver_fsh')
let bloomCombineProgram=createProgram(superSecretShaders[currentSuperSecretShader])
let skyRendererProgram=createProgram('sky_renderer_vsh','sky_renderer_fsh')
let sunRayProgram=createProgram('postprocessing_vsh','sunray_fsh')
let ssaoProgram=createProgram('postprocessing_vsh','ssao_fsh')
let fxaaProgram=createProgram('postprocessing_vsh','fxaa_fsh')


let screenVerts=[-1,-1,1,-1,1,1,-1,1]
    
let screenIndex=[0,1,2,0,2,3]

let screenVertBuffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,screenVertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(screenVerts),gl.STATIC_DRAW)

let screenIndexBuffer=gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,screenIndexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(screenIndex),gl.STATIC_DRAW)

function createNullTexture(){
    
    let t=gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D,t)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
    
    return t
}

function createFramebufferTexture(target,depth){
    
    let f=gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER,f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,target,0)
    
    if(depth){
        
        let depthBuffer=gl.createRenderbuffer()
        gl.bindRenderbuffer(gl.RENDERBUFFER,depthBuffer)
        gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,width,height)
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depthBuffer)
        
    }
    
    return f
}

let og_tex_color=createNullTexture(),
    og_tex_info=createNullTexture(),
    og_tex_normal=createNullTexture(),
    
    sunray_tex=createNullTexture(),
    sunray_fb=createFramebufferTexture(sunray_tex),
    filtered_tex=createNullTexture(),
    filtered_fb=createFramebufferTexture(filtered_tex),
    blurred_hor_tex=createNullTexture(),
    blurred_hor_fb=createFramebufferTexture(blurred_hor_tex),
    blurred_ver_tex=createNullTexture(),
    blurred_ver_fb=createFramebufferTexture(blurred_ver_tex),
    ssao_tex=createNullTexture(),
    ssao_fb=createFramebufferTexture(ssao_tex),
    fxaa_tex=createNullTexture(),
    fxaa_fb=createFramebufferTexture(fxaa_tex),
    
    empty_ssao_normal_tex=createNullTexture()

let og_fb=gl.createFramebuffer()

gl.bindFramebuffer(gl.FRAMEBUFFER,og_fb)

let depthBuffer=gl.createRenderbuffer()
gl.bindRenderbuffer(gl.RENDERBUFFER,depthBuffer)
gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,width,height)
gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,depthBuffer)

gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,og_tex_color,0)
gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT1,gl.TEXTURE_2D,og_tex_info,0)
gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER,gl.COLOR_ATTACHMENT2,gl.TEXTURE_2D,og_tex_normal,0)

gl.drawBuffers([gl.COLOR_ATTACHMENT0,gl.COLOR_ATTACHMENT1,gl.COLOR_ATTACHMENT2])


gl.bindFramebuffer(gl.FRAMEBUFFER,null)


function initTextures(textures){
    
    board_ctx.fillStyle='rgb(0,0,0)'
    board_ctx.fillRect(0,0,512,512)
    board_ctx.lineWidth=3
    board_ctx.beginPath()
    board_ctx.moveTo(256,0)
    board_ctx.lineTo(256,512)
    board_ctx.closePath()
    board_ctx.strokeStyle='rgb(255,255,255)'
    board_ctx.stroke()
    
    board_ctx.beginPath()
    board_ctx.moveTo(0,256)
    board_ctx.lineTo(512,256)
    board_ctx.closePath()
    board_ctx.strokeStyle='rgb(255,255,255)'
    board_ctx.stroke()
    
    board_ctx.fillStyle='rgb(255,255,255)'
    board_ctx.font='bold 40px arial'
    board_ctx.fillText('Prototype',20,50)
    board_ctx.fillText('5 x 5 ft.',20,100)
    board_ctx.fillRect(0,0,7,512)
    board_ctx.fillRect(512,0,-7,512)
    board_ctx.fillRect(0,0,512,7)
    board_ctx.fillRect(0,512,512,-7)
    board_ctx.fillStyle='rgb(0,0,0)'
    
    let textureData=board_ctx.getImageData(0,0,512,512)
    
    textures.boxTexture=gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,512,512,0,gl.RGBA,gl.UNSIGNED_BYTE,textureData)
    
    gl.generateMipmap(gl.TEXTURE_2D)
    
    
    board_ctx.clearRect(0,0,1500,1500)
    board_ctx.font='bold 30px arial'
    board_ctx.fillStyle='rgb(0,0,0)'
    
    board_ctx.fillText('WASD to move',10,30)
    board_ctx.fillText('SPACE to jump',10,65)
    
    board_ctx.fillText('Shoot the enemy!',10,125)
    
    board_ctx.fillText('Drop your weapon',10,190)
    board_ctx.fillText('& hold down your',12,220)
    board_ctx.fillText('mouse to move the',7,250)
    board_ctx.fillText('boxes and spheres!',5,280)
    
    board_ctx.fillText('SHIFT to crouch',20,340)
    board_ctx.fillText('Hold jump while',20,400)
    board_ctx.fillText('touching a wall',20,430)
    board_ctx.fillText('to walljump!',50,460)
    
    board_ctx.fillText('Use the cube to',20,500)
    board_ctx.fillText('break the glass',20,530)
    board_ctx.fillText('& kill the enemy',20,560)
    
    board_ctx.fillText('Press E to drop',20,605)
    board_ctx.fillText('your weapon!',35,640)
    
    board_ctx.fillText('OWO',90,700)
    board_ctx.fillText('whta r u doign hre?',3,730)
    
    board_ctx.fillText('Congratulations!',20,780)
    board_ctx.fillText('You are now an',27,810)
    board_ctx.fillText('EPIC GAMER!!!!',27,845)
    board_ctx.fillText('Thx 4 playing!!!',30,900)
    board_ctx.fillText('More games to come!',4,1012)
    board_ctx.font='bold 20px arial'
    board_ctx.fillText('The end of a game...',40,949)
    board_ctx.font='bold 15px arial'
    board_ctx.fillText('The begining of the best games on KA',10,969)
    
    textures.messages=gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D,textures.messages)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1500,1500,0,gl.RGBA,gl.UNSIGNED_BYTE,board_ctx.getImageData(0,0,1500,1500))
    
    textures.messages.bounds=[
        
        [0,0,235,90],
        [0,95,275,50],
        [0,160,295,140],
        [0,370,275,100],
        [0,470,275,110],
        [0,580,275,80],
        [0,310,275,35],
        [0,671,285,75],
        [0,750,319,280]
    ]
    
    for(let i in textures.messages.bounds){
        
        vec4.scale(textures.messages.bounds[i],textures.messages.bounds[i],1/1500)
    }
    
    gl.generateMipmap(gl.TEXTURE_2D)
    
    return textures
}

let textures=initTextures({})

let MATH=(function(out){
    
    out.IDENTITY_MATRIX=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
    out.SIN_45=Math.SQRT1_2
    out.TWO_PI=Math.PI*2
    out.HALF_PI=Math.PI*0.5
    out.QUAT_PI=Math.PI*0.25
    out.TO_RAD=Math.PI/180
    out.TO_DEG=180/Math.PI
    out.RECIP_5=1/5
    out.RECIP_255=1/255
    out.HUE_CONV=(360/255)/60
    out.HALF_TO_RAD=out.TO_RAD*0.5
    out.constrain=function(x,a,b){return x<a?a:x>b?b:x}
    out.random=function(a,b){return Math.random()*(b-a)+a}
    
    out.rotateX=function(out,theta){
        
        let sinTheta=Math.sin(theta),cosTheta=Math.cos(theta),_y=out[1],_z=out[2]
        
        out[1]=_y*cosTheta-_z*sinTheta
        out[2]=_y*sinTheta+_z*cosTheta
    }
    
    out.getWeaponName=function(n){
        
        return ({gun:'Pistol',shotgun:'Shotgun',grapplingHook:'Grappling Hook',boomer:'Grenade Launcher',bow:'Bow',railgun:'Railgun',candycane:'Candycane Shank',sword:'Sword',revolver:'Revolver',sniper:'Sniper',reverse:'UNO Reverse Card',lantern:'Lantern',banana:'Banana',shard:'Glass Shard',ball:'Bouncy Ball',wand:'Wand'})[n]
    }
    
    out.rotateToNewWeapon=function(n){
        
        let arr=['gun','shotgun','grapplingHook','boomer','bow','railgun','candycane','sword','revolver','sniper','reverse','lantern','banana','shard','ball','wand'],_n=arr.indexOf(n)
        return arr[(_n+1)%arr.length]
    }
    
    out.manhattanDist_milk=function(){
        
        let x=Math.abs(player.body.position.x-levels[currentLevel].milk[0]),
            y=Math.abs(player.body.position.y-levels[currentLevel].milk[1]),
            z=Math.abs(player.body.position.z-levels[currentLevel].milk[2])
        return x+y+z
    }
    
    out.map=function(value,istart,istop,ostart,ostop){
        
      return ostart+(ostop-ostart)*((value-istart)/(istop-istart))
    }
    
    out.lerp=function(a,b,t){
        
        return t*(b-a)+a
    }
    
    out.HSBToRGB=function(h,s,b){
        
        s*=out.RECIP_255
        b*=out.RECIP_255
        let k=(n)=>(n+h*out.HUE_CONV)%6,
        f=(n)=>b*(1-s*Math.max(0,Math.min(k(n),4-k(n),1)))
        
        return [f(5),f(3),f(1)]
    }
    
    //was supposed to be used for billy's legs
    // out.inverseKinematics=function(ax,ay,az,bx,by,bz,len){
        
    //     let AB=vec3.dist([ax,ay,az],[bx,by,bz])
        
    //     let mx=(ax+bx)*0.5,my=(ay+by)*0.5,mz=(az+bz)*0.5
        
    //     if(AB<len*2){
            
    //         let angle=Math.acos(((len*len)+(len*len)-(AB*AB))/(2*len*len)),
    //         h=(AB*0.5)/Math.tan((out.TWO_PI-angle)*0.5)
            
    //         return [mx+h,my,mz]
            
    //     } else {
            
    //         return [mx,my,mz]
    //     }
    // }
    
    
    out.generateBezierCurve=function(a,b,c1,c2,t){
        
        let l=vec3.lerp
        
        let a_c1=l([],a,c1,t),
            c1_c2=l([],c1,c2,t),
            b_c2=l([],b,c2,t),
            p1=l([],a_c1,c1_c2,t),
            p2=l([],b_c2,c1_c2,t)
            
        return l([],p1,p2,t)
        
    }
    
    return out
    
})({})

let LineRenderer=(function(out){
    
    let qualities=[4,'Low',9,'Medium',15,'High']
    
    for(let _i=0;_i<qualities.length;_i+=2){
        
        let i=qualities[_i],n=qualities[_i+1]
        out['verts'+n]=[]
        out['index'+n]=[]
        
        for(let j=0;j<MATH.TWO_PI;j+=MATH.TWO_PI/i){
            
            let t=j-MATH.QUAT_PI
            
            out['verts'+n].push(
                
                Math.cos(t)*0.5,Math.sin(t)*0.5,0.5,
                Math.cos(t)*0.5,Math.sin(t)*0.5,-0.5
            )
        }
        
        for(let j=0;j<i*2;j++){
            
            if(j%2===0){
                
                out['index'+n].push(j,(j+1)%(i*2),(j+2)%(i*2))
                
            } else {
                
                out['index'+n].push((j+2)%(i*2),(j+1)%(i*2),j)
            }
        }
        
        for(let j=0;j<i*2;j+=2){
            
            out['index'+n].push(1,j+3,j+1)
            out['index'+n].push(j,j+2,0)
        }
        
        out['indexAmount'+n]=out['index'+n].length
        
        out['VAO'+n]=gl.createVertexArray()
        gl.bindVertexArray(out['VAO'+n])
        
        out['vertBuffer'+n]=gl.createBuffer()
        out['indexBuffer'+n]=gl.createBuffer()
        
        gl.bindBuffer(gl.ARRAY_BUFFER,out['vertBuffer'+n])
        gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(out['verts'+n]),gl.STATIC_DRAW)
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out['indexBuffer'+n])
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(out['index'+n]),gl.STATIC_DRAW)
        
        gl.vertexAttribPointer(glCache.line_vertPos,3,gl.FLOAT,gl.FALSE,12,0)
        gl.enableVertexAttribArray(glCache.line_vertPos)
        
        gl.bindVertexArray(null)
    }
    
    
    out.data=[]
    
    out.add=function(p1,p2,thickness1,thickness2,col1,col2,widthScale=1,heightScale=1,detail='Medium'){
        
        out.data.push({p1:p1,p2:p2,thickness1:thickness1,thickness2:thickness2,col1:col1,col2:col2,widthScale:widthScale,heightScale:heightScale,detail:detail})
    }
    
    out.render=function(){
        
        if(!out.data.length) return
        
        gl.useProgram(lineRendererProgram)
        gl.uniformMatrix4fv(glCache.line_viewMatrix,gl.FALSE,player.viewMatrix)
        
        for(let i in out.data){
            
            let d=out.data[i]
            
            gl.bindVertexArray(out['VAO'+d.detail])
            
            gl.uniform4f(glCache.line_color1,...d.col1)
            gl.uniform4f(glCache.line_color2,...d.col2)
            
            gl.uniform2f(glCache.line_thickness,d.thickness1,d.thickness2)
            
            let _d=vec3.dist(d.p1,d.p2),
                p=vec3.lerp([],d.p1,d.p2,0.5),
                l=vec3.sub([],d.p2,d.p1)
                vec3.scale(l,l,-1/_d)
            let y=Math.atan2(l[0],l[2]),pi=Math.asin(-l[1]),
                q=quat.fromEuler([],pi*MATH.TO_DEG,y*MATH.TO_DEG,0),
                mat=mat4.fromRotationTranslationScale([],q,p,[d.widthScale,d.heightScale,_d])
            
            gl.uniformMatrix4fv(glCache.line_modelMatrix,gl.FALSE,mat)
            gl.drawElements(gl.TRIANGLES,out['indexAmount'+d.detail],gl.UNSIGNED_SHORT,0)
            
        }
        
        gl.bindVertexArray(null)
        out.data=[]
        
    }
    
    return out
    
})({})

function icosphere(order=0){
    
    const f=(1+5**0.5)*0.5;
    const T=4**order;
    
    const vertices=new Float32Array((10*T+2)*3);
    vertices.set(Float32Array.of(
    -1,f,0,1,f,0,-1,-f,0,1,-f,0,
    0,-1,f,0,1,f,0,-1,-f,0,1,-f,
    f,0,-1,f,0,1,-f,0,-1,-f,0,1));
    let triangles=Uint32Array.of(
    0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,
    11,10,2,5,11,4,1,5,9,7,1,8,10,7,6,
    3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,
    9,8,1,4,9,5,2,4,11,6,2,10,8,6,7);
    
    let v=12
    let midCache=order?new Map():null;
    
    function addMidPoint(a,b) {
        
        let key=Math.floor((a+b)*(a+b+1)*0.5)+Math.min(a,b)
        let i=midCache.get(key)
        if (i!==undefined){ midCache.delete(key); return i }
        midCache.set(key,v)
        for (let k=0; k < 3; k++) vertices[3*v+k]=(vertices[3*a+k]+vertices[3*b+k])*0.5
        i=v++
        return i
    }
    
    let trianglesPrev=triangles
    
    for (let i=0;i<order;i++){
        
        triangles=new Uint32Array(trianglesPrev.length<<2)
        
        for (let k=0;k<trianglesPrev.length;k+=3){
            
          let v1=trianglesPrev[k]
          let v2=trianglesPrev[k+1]
          let v3=trianglesPrev[k+2]
          let a=addMidPoint(v1,v2)
          let b=addMidPoint(v2,v3)
          let c=addMidPoint(v3,v1)
          let t=k<<2
          triangles[t++]=v1; triangles[t++]=a; triangles[t++]=c;
          triangles[t++]=v2; triangles[t++]=b; triangles[t++]=a;
          triangles[t++]=v3; triangles[t++]=c; triangles[t++]=b;
          triangles[t++]=a;  triangles[t++]=b; triangles[t++]=c;
        }
        
        trianglesPrev=triangles
    }
    
    for (let i=0;i<vertices.length;i+=3) {
        
        let m=1/Math.hypot(vertices[i],vertices[i+1],vertices[i+2])
        vertices[i]*=m
        vertices[i+1]*=m
        vertices[i+2]*=m
    }
    
    return {verts:vertices,index:triangles}
}

function createBoxMesh(x,y,z,w,h,l,r,g,b,vl,rx,ry,rz){
    
    let _q=quat.fromEuler([],rx,ry,rz)
    
    let v=[
        
        [-0.5*w,0.5*h,-0.5*l],
        [-0.5*w,0.5*h,0.5*l],
        [0.5*w,0.5*h,0.5*l],
        [0.5*w,0.5*h,-0.5*l],
        [-0.5*w,-0.5*h,-0.5*l],
        [-0.5*w,-0.5*h,0.5*l],
        [0.5*w,-0.5*h,0.5*l],
        [0.5*w,-0.5*h,-0.5*l]
        
    ],n=[
        
        [0,1,0],
        [0,0,1],
        [0,0,-1],
        [1,0,0],
        [-1,0,0],
        [0,-1,0],
    ]
    
    for(let i in v){
        
        if(rx||ry||rz){
            
            vec3.transformQuat(v[i],v[i],_q)
            
            if(i<6){
                
                vec3.transformQuat(n[i],n[i],_q)
            }
        }
        
        v[i][0]+=x
        v[i][1]+=y
        v[i][2]+=z
    }
    
    return {verts:[
        
        v[0][0],v[0][1],v[0][2],r,g,b,n[0][0],n[0][1],n[0][2],
        v[1][0],v[1][1],v[1][2],r,g,b,n[0][0],n[0][1],n[0][2],
        v[2][0],v[2][1],v[2][2],r,g,b,n[0][0],n[0][1],n[0][2],
        v[3][0],v[3][1],v[3][2],r,g,b,n[0][0],n[0][1],n[0][2],
        
        v[1][0],v[1][1],v[1][2],r,g,b,n[1][0],n[1][1],n[1][2],
        v[2][0],v[2][1],v[2][2],r,g,b,n[1][0],n[1][1],n[1][2],
        v[5][0],v[5][1],v[5][2],r,g,b,n[1][0],n[1][1],n[1][2],
        v[6][0],v[6][1],v[6][2],r,g,b,n[1][0],n[1][1],n[1][2],
        
        v[0][0],v[0][1],v[0][2],r,g,b,n[2][0],n[2][1],n[2][2],
        v[3][0],v[3][1],v[3][2],r,g,b,n[2][0],n[2][1],n[2][2],
        v[4][0],v[4][1],v[4][2],r,g,b,n[2][0],n[2][1],n[2][2],
        v[7][0],v[7][1],v[7][2],r,g,b,n[2][0],n[2][1],n[2][2],
        
        v[2][0],v[2][1],v[2][2],r,g,b,n[3][0],n[3][1],n[3][2],
        v[3][0],v[3][1],v[3][2],r,g,b,n[3][0],n[3][1],n[3][2],
        v[6][0],v[6][1],v[6][2],r,g,b,n[3][0],n[3][1],n[3][2],
        v[7][0],v[7][1],v[7][2],r,g,b,n[3][0],n[3][1],n[3][2],
        
        v[0][0],v[0][1],v[0][2],r,g,b,n[4][0],n[4][1],n[4][2],
        v[1][0],v[1][1],v[1][2],r,g,b,n[4][0],n[4][1],n[4][2],
        v[4][0],v[4][1],v[4][2],r,g,b,n[4][0],n[4][1],n[4][2],
        v[5][0],v[5][1],v[5][2],r,g,b,n[4][0],n[4][1],n[4][2],
        
        v[4][0],v[4][1],v[4][2],r,g,b,n[5][0],n[5][1],n[5][2],
        v[5][0],v[5][1],v[5][2],r,g,b,n[5][0],n[5][1],n[5][2],
        v[6][0],v[6][1],v[6][2],r,g,b,n[5][0],n[5][1],n[5][2],
        v[7][0],v[7][1],v[7][2],r,g,b,n[5][0],n[5][1],n[5][2]
    ],index:[
        
        vl,1+vl,2+vl,
        vl,2+vl,3+vl,
        5+vl,6+vl,7+vl,
        6+vl,5+vl,4+vl,
        8+vl,9+vl,10+vl,
        11+vl,10+vl,9+vl,
        14+vl,13+vl,12+vl,
        13+vl,14+vl,15+vl,
        18+vl,17+vl,16+vl,
        17+vl,18+vl,19+vl,
        22+vl,21+vl,20+vl,
        23+vl,22+vl,20+vl
    ]}
}

function createCylinderMesh(x,y,z,rad,hei,sides,r,g,b,vl,rx,ry,rz,r2){
    
    let verts=[],index=[],rad2=r2??rad
    
    for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
        
        let t1=t-inc*0.5,t2=t+inc*0.5
        verts.push(
            Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r,g,b,Math.cos(t1),Math.sin(t1),0,
            Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r,g,b,Math.cos(t1),Math.sin(t1),0,
            Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r,g,b,Math.cos(t2),Math.sin(t2),0,
            Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r,g,b,Math.cos(t2),Math.sin(t2),0)
        
        let _vl=verts.length/9
        index.push(_vl,_vl+1,_vl+2,_vl+3,_vl+2,_vl+1)
    }
    
    let _v=verts.length/9
    
    for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
        
        let t1=t-inc*0.5,t2=t+inc*0.5
        verts.push(
            Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r,g,b,0,0,1,
            Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r,g,b,0,0,1)
    }
    for(let l=verts.length/9,i=_v;i<l;i++){
        
        index.push(_v,i,i+2)
    }
    _v=verts.length/9
    for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
        
        let t1=t-inc*0.5,t2=t+inc*0.5
        verts.push(
            
            Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r,g,b,0,0,-1,
            Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r,g,b,0,0,-1)
    }
    for(let l=verts.length/9,i=_v;i<l;i++){
        
        index.push(i,i-1,_v)
    }
    
    for(let i in index){
        
        index[i]+=vl
    }
    
    let rotQuat=quat.fromEuler([],rx,ry,rz)
    
    for(let i=0;i<verts.length;i+=9){
        
        if(rx){
            
            let rotated=vec3.transformQuat([],[verts[i],verts[i+1],verts[i+2]],rotQuat)
            verts[i]=rotated[0]+x
            verts[i+1]=rotated[1]+y
            verts[i+2]=rotated[2]+z
            
            rotated=vec3.transformQuat(rotated,[verts[i+6],verts[i+7],verts[i+8]],rotQuat)
            
            verts[i+6]=rotated[0]
            verts[i+7]=rotated[1]
            verts[i+8]=rotated[2]
            
        } else {
            
            verts[i]+=x
            verts[i+1]+=y
            verts[i+2]+=z
        }
    }
    
    return {verts:verts,index:index}
}

function createSphereMesh(x,y,z,rad,detail,r,g,b,vl){
    
    let _m=icosphere(detail),verts=[],index=[]
    
    for(let i=0,l=_m.verts.length;i<l;i+=3){
        
        verts.push(_m.verts[i]*rad+x,_m.verts[i+1]*rad+y,_m.verts[i+2]*rad+z,r,g,b,_m.verts[i],_m.verts[i+1],_m.verts[i+2])
    }
    
    for(let i in _m.index){
        
        index.push(_m.index[i]+vl)
    }
    
    return {verts:verts,index:index}
}

function bindAndSetMeshBuffers(mesh){
    
    mesh.VAO=gl.createVertexArray()
    
    gl.bindVertexArray(mesh.VAO)
    
    mesh.vertBuffer=gl.createBuffer()
    mesh.indexBuffer=gl.createBuffer()
    
    gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vertBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(mesh.verts),gl.STATIC_DRAW)
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(mesh.index),gl.STATIC_DRAW)
    
    gl.vertexAttribPointer(glCache.dynamic_vertPos,3,gl.FLOAT,gl.FALSE,36,0)
    gl.vertexAttribPointer(glCache.dynamic_vertColor,3,gl.FLOAT,gl.FALSE,36,12)
    gl.vertexAttribPointer(glCache.dynamic_vertNormal,3,gl.FLOAT,gl.FALSE,36,24)
    gl.enableVertexAttribArray(glCache.dynamic_vertPos)
    gl.enableVertexAttribArray(glCache.dynamic_vertColor)
    gl.enableVertexAttribArray(glCache.dynamic_vertNormal)
    gl.bindVertexArray(null)
    mesh.indexAmount=mesh.index.length
}

function initGLCache(){
    
    glCache.static_vertPos=gl.getAttribLocation(staticGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.static_vertPos)
    glCache.static_vertColor=gl.getAttribLocation(staticGeometryProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.static_vertColor)
    glCache.static_vertTexCoord=gl.getAttribLocation(staticGeometryProgram,'vertTexCoord')
    gl.enableVertexAttribArray(glCache.static_vertTexCoord)
    glCache.static_vertNormal=gl.getAttribLocation(staticGeometryProgram,'vertNormal')
    gl.enableVertexAttribArray(glCache.static_vertNormal)
    glCache.static_viewMatrix=gl.getUniformLocation(staticGeometryProgram,'viewMatrix')
    glCache.static_lightPos=gl.getUniformLocation(staticGeometryProgram,'lightPos')
    glCache.static_playerPos=gl.getUniformLocation(staticGeometryProgram,'playerPos')
    glCache.static_alpha=gl.getUniformLocation(staticGeometryProgram,'alpha')
    
    glCache.dynamic_vertPos=gl.getAttribLocation(dynamicGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.dynamic_vertPos)
    glCache.dynamic_vertColor=gl.getAttribLocation(dynamicGeometryProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.dynamic_vertColor)
    glCache.dynamic_vertNormal=gl.getAttribLocation(dynamicGeometryProgram,'vertNormal')
    gl.enableVertexAttribArray(glCache.dynamic_vertNormal)
    glCache.dynamic_viewMatrix=gl.getUniformLocation(dynamicGeometryProgram,'viewMatrix')
    glCache.dynamic_lightPos=gl.getUniformLocation(dynamicGeometryProgram,'lightPos')
    glCache.dynamic_playerPos=gl.getUniformLocation(dynamicGeometryProgram,'playerPos')
    glCache.dynamic_modelMatrix=gl.getUniformLocation(dynamicGeometryProgram,'modelMatrix')
    
    glCache.weapon_vertPos=gl.getAttribLocation(weaponRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.weapon_vertPos)
    glCache.weapon_vertColor=gl.getAttribLocation(weaponRendererProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.weapon_vertColor)
    glCache.weapon_vertNormal=gl.getAttribLocation(weaponRendererProgram,'vertNormal')
    gl.enableVertexAttribArray(glCache.weapon_vertNormal)
    glCache.weapon_viewMatrix=gl.getUniformLocation(weaponRendererProgram,'viewMatrix')
    glCache.weapon_lightPos=gl.getUniformLocation(weaponRendererProgram,'lightPos')
    glCache.weapon_playerPos=gl.getUniformLocation(weaponRendererProgram,'playerPos')
    glCache.weapon_modelMatrix=gl.getUniformLocation(weaponRendererProgram,'modelMatrix')
    glCache.weapon_offset=gl.getUniformLocation(weaponRendererProgram,'offset')
    glCache.weapon_reloadAngle=gl.getUniformLocation(weaponRendererProgram,'reloadAngle')
    
    glCache.line_modelMatrix=gl.getUniformLocation(lineRendererProgram,'modelMatrix')
    glCache.line_viewMatrix=gl.getUniformLocation(lineRendererProgram,'viewMatrix')
    glCache.line_color1=gl.getUniformLocation(lineRendererProgram,'lineColor1')
    glCache.line_color2=gl.getUniformLocation(lineRendererProgram,'lineColor2')
    glCache.line_thickness=gl.getUniformLocation(lineRendererProgram,'thickness')
    glCache.line_vertPos=gl.getUniformLocation(lineRendererProgram,'vertPos')
    
    glCache.board_vertPos=gl.getAttribLocation(boardGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.board_vertPos)
    glCache.board_vertTexCoord=gl.getAttribLocation(boardGeometryProgram,'vertTexCoord')
    gl.enableVertexAttribArray(glCache.board_vertTexCoord)
    glCache.board_viewMatrix=gl.getUniformLocation(boardGeometryProgram,'viewMatrix')
    
    glCache.particle_vertPos=gl.getAttribLocation(particleRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.particle_vertPos)
    glCache.particle_vertColor=gl.getAttribLocation(particleRendererProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.particle_vertColor)
    glCache.particle_vertSize=gl.getAttribLocation(particleRendererProgram,'vertSize')
    gl.enableVertexAttribArray(glCache.particle_vertSize)
    glCache.particle_vertRot=gl.getAttribLocation(particleRendererProgram,'vertRot')
    gl.enableVertexAttribArray(glCache.particle_vertRot)
    glCache.particle_viewMatrix=gl.getUniformLocation(particleRendererProgram,'viewMatrix')
    
    glCache.postprocessingScreenVerts=gl.getAttribLocation(bloomFilterProgram,'screenVerts')
    glCache.bloomCombine_ogTex=gl.getUniformLocation(bloomCombineProgram,'ogTex')
    glCache.bloomCombine_bloomTex=gl.getUniformLocation(bloomCombineProgram,'bloomTex')
    glCache.bloomCombine_sunrayTex=gl.getUniformLocation(bloomCombineProgram,'sunrayTex')
    glCache.bloomCombine_infoTex=gl.getUniformLocation(bloomCombineProgram,'infoTex')
    glCache.bloomCombine_ssaoTex=gl.getUniformLocation(bloomCombineProgram,'ssaoTex')
    glCache.bloomCombine_time=gl.getUniformLocation(bloomCombineProgram,'time')
    
    glCache.sky_vertPos=gl.getAttribLocation(skyRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.sky_vertPos)
    glCache.sky_vertIsSun=gl.getAttribLocation(skyRendererProgram,'vertIsSun')
    gl.enableVertexAttribArray(glCache.sky_vertIsSun)
    glCache.sky_translation=gl.getUniformLocation(skyRendererProgram,'screenTranslation')
    
    glCache.sunray_sunPos=gl.getUniformLocation(sunRayProgram,'sunPos')
    
    glCache.ssao_normalTex=gl.getUniformLocation(ssaoProgram,'normalTex')
    
}

initGLCache()

let meshes=(function(out){
    
    out.board={}
    let m=createBoxMesh(0,8,0,4,4,1,0,0,0,0)
    out.board.verts=m.verts
    out.board.index=m.index
    bindAndSetMeshBuffers(out.board)
    
    out.cube={}
    let r=0.1,g=0.3,b=0.9
    m=createBoxMesh(0,0,0,1,1,1,r,g,b,0)
    out.cube.verts=m.verts
    out.cube.index=m.index
    bindAndSetMeshBuffers(out.cube)
    
    out.billy0={}
    m=createBoxMesh(0,0,0,1.15,1.15,1.15,0.4,0.4,0.4,0)
    out.billy0.verts=m.verts
    out.billy0.index=m.index
    m=createBoxMesh(0,0,0.01,1,1,1.15,0,0,0,out.billy0.verts.length/9)
    out.billy0.verts.push(...m.verts)
    out.billy0.index.push(...m.index)
    m=createCylinderMesh(-0.2,0.2,0.0125,0.075,1.15,7,0,10,0,out.billy0.verts.length/9,0,0,0,0.05)
    out.billy0.verts.push(...m.verts)
    out.billy0.index.push(...m.index)
    m=createCylinderMesh(0.2,0.2,0.0125,0.075,1.15,7,0,10,0,out.billy0.verts.length/9,0,0,0,0.05)
    out.billy0.verts.push(...m.verts)
    out.billy0.index.push(...m.index)
    m=createBoxMesh(0,-0.15,0.0125,0.3,0.1,1.15,0,10,0,out.billy0.verts.length/9)
    out.billy0.verts.push(...m.verts)
    out.billy0.index.push(...m.index)
    m=createBoxMesh(0.19,-0.2,0.0125,0.2,0.1,1.15,0,10,0,out.billy0.verts.length/9,0,0,-45)
    out.billy0.verts.push(...m.verts)
    out.billy0.index.push(...m.index)
    m=createBoxMesh(-0.19,-0.2,0.0125,0.2,0.1,1.15,0,10,0,out.billy0.verts.length/9,0,0,45)
    out.billy0.verts.push(...m.verts)
    out.billy0.index.push(...m.index)
    bindAndSetMeshBuffers(out.billy0)
    
    out.billy1={}
    m=createBoxMesh(0,0,0,1.15,1.15,1.15,0.4,0.4,0.4,0)
    out.billy1.verts=m.verts
    out.billy1.index=m.index
    m=createBoxMesh(0,0,0.01,1,1,1.15,0,0,0,out.billy1.verts.length/9)
    out.billy1.verts.push(...m.verts)
    out.billy1.index.push(...m.index)
    m=createCylinderMesh(-0.2,0.2,0.0125,0.075,1.15,7,0,10,0,out.billy1.verts.length/9,0,0,0,0.05)
    out.billy1.verts.push(...m.verts)
    out.billy1.index.push(...m.index)
    m=createCylinderMesh(0.2,0.2,0.0125,0.075,1.15,7,0,10,0,out.billy1.verts.length/9,0,0,0,0.05)
    out.billy1.verts.push(...m.verts)
    out.billy1.index.push(...m.index)
    m=createBoxMesh(0,-0.15,0.0125,0.3,0.1,1.15,0,10,0,out.billy1.verts.length/9)
    out.billy1.verts.push(...m.verts)
    out.billy1.index.push(...m.index)
    m=createBoxMesh(0.19,-0.09,0.0125,0.2,0.1,1.15,0,10,0,out.billy1.verts.length/9,0,0,45)
    out.billy1.verts.push(...m.verts)
    out.billy1.index.push(...m.index)
    m=createBoxMesh(-0.19,-0.09,0.0125,0.2,0.1,1.15,0,10,0,out.billy1.verts.length/9,0,0,-45)
    out.billy1.verts.push(...m.verts)
    out.billy1.index.push(...m.index)
    bindAndSetMeshBuffers(out.billy1)
    
    out.billy2={}
    m=createBoxMesh(0,0,0,1.15,1.15,1.15,0.4,0.4,0.4,0)
    out.billy2.verts=m.verts
    out.billy2.index=m.index
    m=createBoxMesh(0,0,0.01,1,1,1.15,0,0,0,out.billy2.verts.length/9)
    out.billy2.verts.push(...m.verts)
    out.billy2.index.push(...m.index)
    m=createCylinderMesh(-0.2,0.2,0.0125,0.075,1.15,7,0,10,0,out.billy2.verts.length/9,0,0,0,0.05)
    out.billy2.verts.push(...m.verts)
    out.billy2.index.push(...m.index)
    m=createCylinderMesh(0.2,0.2,0.0125,0.075,1.15,7,0,10,0,out.billy2.verts.length/9,0,0,0,0.05)
    out.billy2.verts.push(...m.verts)
    out.billy2.index.push(...m.index)
    m=createBoxMesh(0,0,0.0125,0.3,0.1,1.15,0,10,0,out.billy2.verts.length/9)
    out.billy2.verts.push(...m.verts)
    out.billy2.index.push(...m.index)
    bindAndSetMeshBuffers(out.billy2)
    
    out.sphere={}
    m=icosphere(3)
    out.sphere.verts=[]
    for(let i=0,l=m.verts.length;i<l;i+=3){
        out.sphere.verts.push(m.verts[i]*0.5,m.verts[i+1]*0.5,m.verts[i+2]*0.5,r,g,b,m.verts[i],m.verts[i+1],m.verts[i+2])
    }
    out.sphere.index=m.index
    bindAndSetMeshBuffers(out.sphere)
    
    out.milk={}
    out.milk.verts=[]
    out.milk.index=[]
    m=createBoxMesh(0,0,0,0.8,1.5,0.8,0.1,0.6,1,0)
    out.milk.verts.push(...m.verts)
    out.milk.index.push(...m.index)
    m=createBoxMesh(0,0.75,0,Math.SQRT1_2*0.8,Math.SQRT1_2*0.8,0.8,0.1,0.6,1,out.milk.verts.length/9,0,0,45)
    out.milk.verts.push(...m.verts)
    out.milk.index.push(...m.index)
    m=createBoxMesh(0,0.1,0,0.805,0.45,0.805,1,1,1,out.milk.verts.length/9)
    out.milk.verts.push(...m.verts)
    out.milk.index.push(...m.index)
    out.milk.indexAmount=out.milk.index.length
    bindAndSetMeshBuffers(out.milk)
    
    out.bullet={}
    out.bullet.verts=[]
    out.bullet.index=[]
    m=createSphereMesh(0,0,0,0.65,1,0.5,0.5,0.5,0)
    out.bullet.verts.push(...m.verts)
    out.bullet.index.push(...m.index)
    bindAndSetMeshBuffers(out.bullet)
    
    out.bomb={}
    m=icosphere(1)
    out.bomb.verts=[]
    for(let i=0,l=m.verts.length;i<l;i+=3){
        out.bomb.verts.push(m.verts[i]*0.25,m.verts[i+1]*0.25,m.verts[i+2]*0.25,0.2,0.2,0.2,m.verts[i],m.verts[i+1],m.verts[i+2])
    }
    out.bomb.index=m.index
    bindAndSetMeshBuffers(out.bomb)
    
    out.arrow={}
    out.arrow.verts=[]
    out.arrow.index=[]
    bindAndSetMeshBuffers(out.arrow)
    
    out.lanternBomb={}
    m=icosphere(1)
    out.lanternBomb.verts=[]
    for(let i=0,l=m.verts.length;i<l;i+=3){
        out.lanternBomb.verts.push(m.verts[i]*0.25,m.verts[i+1]*0.25,m.verts[i+2]*0.25,2,1,0,m.verts[i],m.verts[i+1],m.verts[i+2])
    }
    out.lanternBomb.index=m.index
    bindAndSetMeshBuffers(out.lanternBomb)
    
    out.enemy={}
    out.enemy.verts=[]
    out.enemy.index=[]
    m=icosphere(2)
    for(let i=0,l=m.verts.length;i<l;i+=3){
        
        out.enemy.verts.push(m.verts[i]*0.5,m.verts[i+1]*0.5+1.75,m.verts[i+2]*0.5,r,g,b,m.verts[i],m.verts[i+1],m.verts[i+2])
    }
    out.enemy.index=[...m.index]
    m=createBoxMesh(0,0.5,0,1.2,1.5,0.5,r,g,b,out.enemy.verts.length/9)
    out.enemy.verts.push(...(m.verts))
    out.enemy.index.push(...(m.index))
    m=createBoxMesh(-0.5,0.9,-0.5,1.5,0.4,0.4,r,g,b,out.enemy.verts.length/9,0,70,0)
    out.enemy.verts.push(...(m.verts))
    out.enemy.index.push(...(m.index))
    m=createBoxMesh(0.5,0.9,-0.5,1.5,0.4,0.4,r,g,b,out.enemy.verts.length/9,0,-70,0)
    out.enemy.verts.push(...(m.verts))
    out.enemy.index.push(...(m.index))
    m=createBoxMesh(-0.4,-0.7,0,0.4,1.5,0.4,r,g,b,out.enemy.verts.length/9,0,-25,0)
    out.enemy.verts.push(...(m.verts))
    out.enemy.index.push(...(m.index))
    m=createBoxMesh(0.4,-0.7,0,0.4,1.5,0.4,r,g,b,out.enemy.verts.length/9,0,25,0)
    out.enemy.verts.push(...(m.verts))
    out.enemy.index.push(...(m.index))
    bindAndSetMeshBuffers(out.enemy)
    
    
    out.enemy_running={}
    out.enemy_running.verts=[]
    out.enemy_running.index=[]
    m=icosphere(2)
    for(let i=0,l=m.verts.length;i<l;i+=3){
        
        out.enemy_running.verts.push(m.verts[i]*0.5,m.verts[i+1]*0.5+1.25,m.verts[i+2]*0.5-0.75,r,g,b,m.verts[i],m.verts[i+1],m.verts[i+2])
    }
    out.enemy_running.index=[...m.index]
    m=createBoxMesh(0,0.5,0,1.2,1.5,0.5,r,g,b,out.enemy_running.verts.length/9,-55,0,0)
    out.enemy_running.verts.push(...(m.verts))
    out.enemy_running.index.push(...(m.index))
    m=createBoxMesh(-0.75,1.1,0.5,0.4,0.4,1.5,r,g,b,out.enemy_running.verts.length/9,-30,-20,0)
    out.enemy_running.verts.push(...(m.verts))
    out.enemy_running.index.push(...(m.index))
    m=createBoxMesh(0.75,1.1,0.5,0.4,0.4,1.5,r,g,b,out.enemy_running.verts.length/9,-30,20,0)
    out.enemy_running.verts.push(...(m.verts))
    out.enemy_running.index.push(...(m.index))
    m=createBoxMesh(-0.4,-0.7,0.8,0.4,1.5,0.4,r,g,b,out.enemy_running.verts.length/9,-30,0,0)
    out.enemy_running.verts.push(...(m.verts))
    out.enemy_running.index.push(...(m.index))
    m=createBoxMesh(0.4,-0.7,0.8,0.4,1.5,0.4,r,g,b,out.enemy_running.verts.length/9,-30,0,0)
    out.enemy_running.verts.push(...(m.verts))
    out.enemy_running.index.push(...(m.index))
    bindAndSetMeshBuffers(out.enemy_running)
    
    out.barrel={}
    out.barrel.verts=[]
    out.barrel.index=[]
    m=createCylinderMesh(0,0,0,1,2.5,10,1,0,0,0)
    out.barrel.verts.push(...(m.verts))
    out.barrel.index.push(...(m.index))
    bindAndSetMeshBuffers(out.barrel)
    
    out.gun={}
    out.gun.verts=[]
    out.gun.index=[]
    out.gun.offset=[1,-1,-1.5]
    m=createBoxMesh(0,0,0,0.15,0.5,0.2,0.1,0.1,0.1,0)
    out.gun.verts.push(...(m.verts))
    out.gun.index.push(...(m.index))
    m=createBoxMesh(0,0.25,-0.25,0.2,0.2,0.75,0.1,0.1,0.1,out.gun.verts.length/9)
    out.gun.verts.push(...(m.verts))
    out.gun.index.push(...(m.index))
    bindAndSetMeshBuffers(out.gun)
    
    out.grapplingHook={}
    out.grapplingHook.verts=[]
    out.grapplingHook.index=[]
    out.grapplingHook.offset=[1,-1,-1.5]
    m=createBoxMesh(0,0,0,0.15,0.5,0.175,0.1,0.1,0.1,0)
    out.grapplingHook.verts.push(...(m.verts))
    out.grapplingHook.index.push(...(m.index))
    m=createBoxMesh(0,0.2,-0.2,0.2,0.25,0.75,0.5,0.5,0.5,out.grapplingHook.verts.length/9)
    out.grapplingHook.verts.push(...(m.verts))
    out.grapplingHook.index.push(...(m.index))
    m=createBoxMesh(0,0.3,-0.3,0.05,0.1,0.05,0.1,0.1,0.1,out.grapplingHook.verts.length/9)
    out.grapplingHook.verts.push(...(m.verts))
    out.grapplingHook.index.push(...(m.index))
    m=createBoxMesh(0,0.3,-0.15,0.05,0.1,0.05,0.1,0.1,0.1,out.grapplingHook.verts.length/9)
    out.grapplingHook.verts.push(...(m.verts))
    out.grapplingHook.index.push(...(m.index))
    m=createBoxMesh(0,0.3,0,0.05,0.1,0.05,0.1,0.1,0.1,out.grapplingHook.verts.length/9)
    out.grapplingHook.verts.push(...(m.verts))
    out.grapplingHook.index.push(...(m.index))
    bindAndSetMeshBuffers(out.grapplingHook)
    
    out.hand={}
    out.hand.offset=[0,0,0]
    out.hand.verts=[]
    out.hand.index=[]
    bindAndSetMeshBuffers(out.hand)
    
    out.shotgun={}
    out.shotgun.verts=[]
    out.shotgun.index=[]
    out.shotgun.offset=[1,-1,-1.5]
    m=createBoxMesh(0,0.05,0.1,0.23,0.25,0.4,0.9,0.4,0.1,0)
    out.shotgun.verts.push(...(m.verts))
    out.shotgun.index.push(...(m.index))
    m=createBoxMesh(0,-0.01,-0.4,0.03,0.03,0.9,0.5,0.5,0.5,out.shotgun.verts.length/9)
    out.shotgun.verts.push(...(m.verts))
    out.shotgun.index.push(...(m.index))
    m=createBoxMesh(0,0.1,-0.4,0.09,0.09,0.9,0.5,0.5,0.5,out.shotgun.verts.length/9)
    out.shotgun.verts.push(...(m.verts))
    out.shotgun.index.push(...(m.index))
    bindAndSetMeshBuffers(out.shotgun)
    
    out.boomer={}
    out.boomer.offset=[1,-1,-1.5]
    out.boomer.verts=[]
    out.boomer.index=[]
    m=createBoxMesh(0,0.05,0.1,0.172,0.4,0.172,0,0.25,0,0)
    out.boomer.verts.push(...(m.verts))
    out.boomer.index.push(...(m.index))
    m=createBoxMesh(0,0.35,-0.1,0.2,0.2,0.6,0.1,0.1,0.1,out.boomer.verts.length/9)
    out.boomer.verts.push(...(m.verts))
    out.boomer.index.push(...(m.index))
    m=createBoxMesh(-0.1,0.35,-0.1,0.05,0.25,0.5,0.35,0.35,0.35,out.boomer.verts.length/9)
    out.boomer.verts.push(...(m.verts))
    out.boomer.index.push(...(m.index))
    m=createBoxMesh(0.1,0.35,-0.1,0.05,0.25,0.5,0.35,0.35,0.35,out.boomer.verts.length/9)
    out.boomer.verts.push(...(m.verts))
    out.boomer.index.push(...(m.index))
    m=createBoxMesh(0,0.5,-0.1,0.19,0.05,0.5,0.35,0.35,0.35,out.boomer.verts.length/9)
    out.boomer.verts.push(...(m.verts))
    out.boomer.index.push(...(m.index))
    m=createBoxMesh(0,0.2,-0.1,0.19,0.05,0.5,0.35,0.35,0.35,out.boomer.verts.length/9)
    out.boomer.verts.push(...(m.verts))
    out.boomer.index.push(...(m.index))
    bindAndSetMeshBuffers(out.boomer)
    
    out.bow={}
    out.bow.verts=[]
    out.bow.index=[]
    out.bow.offset=[1,-0.5,-1.5]
    m=createBoxMesh(0,0.25,0,0.1,0.8,0.1,1,0.5,0.3,0,45,0,0)
    out.bow.verts.push(...(m.verts))
    out.bow.index.push(...(m.index))
    m=createBoxMesh(0,-0.25,0,0.1,0.8,0.1,1,0.5,0.3,out.bow.verts.length/9,-45,0,0)
    out.bow.verts.push(...(m.verts))
    out.bow.index.push(...(m.index))
    m=createBoxMesh(0,0,0.25,0.02,1,0.02,1,1,1,out.bow.verts.length/9)
    out.bow.verts.push(...(m.verts))
    out.bow.index.push(...(m.index))
    bindAndSetMeshBuffers(out.bow)
    
    out.railgun={}
    out.railgun.verts=[]
    out.railgun.index=[]
    out.railgun.offset=[1,-1,-1.5]
    m=createBoxMesh(0,0,0,0.15,0.5,0.2,0.3,0.3,0.3,0)
    out.railgun.verts.push(...(m.verts))
    out.railgun.index.push(...(m.index))
    m=createBoxMesh(0,0.2,-0.5,0.25,0.35,1.25,0.3,0.3,0.3,out.railgun.verts.length/9)
    out.railgun.verts.push(...(m.verts))
    out.railgun.index.push(...(m.index))
    m=createBoxMesh(0,0.285,-0.5,0.275,0.2,0.75,0.1,1,0.45,out.railgun.verts.length/9)
    out.railgun.verts.push(...(m.verts))
    out.railgun.index.push(...(m.index))
    bindAndSetMeshBuffers(out.railgun)
    
    out.candycane={}
    out.candycane.verts=[]
    out.candycane.index=[]
    out.candycane.offset=[0.9,-1,-2]
    m=createCylinderMesh(0,0,-0.7,0.1,0.5,5,1,1,1,out.candycane.verts.length/9,0,0,0,0)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    m=createCylinderMesh(0,0,-0.3,0.1,0.3,5,1,0.1,0.1,out.candycane.verts.length/9)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    m=createCylinderMesh(0,0,0,0.1,0.3,5,1,1,1,out.candycane.verts.length/9)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    bindAndSetMeshBuffers(out.candycane)
    m=createCylinderMesh(0,0,0.3,0.1,0.3,5,1,0.1,0.1,out.candycane.verts.length/9)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    m=createCylinderMesh(0,0,0.6,0.1,0.3,5,1,1,1,out.candycane.verts.length/9)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    bindAndSetMeshBuffers(out.candycane)
    m=createCylinderMesh(0,0.1,0.8,0.1,0.3,5,1,0.1,0.1,out.candycane.verts.length/9,-45,0,0)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    m=createCylinderMesh(0,0.3,0.9,0.1,0.3,5,1,1,1,out.candycane.verts.length/9,-90,0,0)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    m=createCylinderMesh(0,0.5,0.8,0.1,0.3,5,1,0.1,0.1,out.candycane.verts.length/9,45,0,0)
    out.candycane.verts.push(...(m.verts))
    out.candycane.index.push(...(m.index))
    bindAndSetMeshBuffers(out.candycane)
    
    out.sword={}
    out.sword.verts=[]
    out.sword.index=[]
    out.sword.offset=[1,-0.25,-1.5]
    m=createCylinderMesh(0,0.125,0,0.075,0.6,7,0.3,0.3,0.3,0,90,0,0)
    out.sword.verts.push(...(m.verts))
    out.sword.index.push(...(m.index))
    m=createCylinderMesh(0,0.625,0,0.075,0.4,7,0.3,0.3,0.3,out.sword.verts.length/9,90,0,0,0)
    out.sword.verts.push(...(m.verts))
    out.sword.index.push(...(m.index))
    m=createBoxMesh(0,-0.25,0,0.45,0.175,0.175,1,1,0.05,out.sword.verts.length/9)
    out.sword.verts.push(...(m.verts))
    out.sword.index.push(...(m.index))
    m=createBoxMesh(0,-0.45,0,0.1,0.3,0.1,0.4,0.2,0,out.sword.verts.length/9,0,45,0)
    out.sword.verts.push(...(m.verts))
    out.sword.index.push(...(m.index))
    bindAndSetMeshBuffers(out.sword)
    
    out.revolver={}
    out.revolver.verts=[]
    out.revolver.index=[]
    out.revolver.offset=[1,-1,-1.5]
    m=createBoxMesh(0,0,0,0.15,0.5,0.2,0.5,0.5,0.5,0)
    out.revolver.verts.push(...(m.verts))
    out.revolver.index.push(...(m.index))
    m=createBoxMesh(0,0.25,-0.25,0.2,0.2,0.75,0.5,0.5,0.5,out.revolver.verts.length/9)
    out.revolver.verts.push(...(m.verts))
    out.revolver.index.push(...(m.index))
    m=createCylinderMesh(0,0.3,-0.25,0.125,0.3,10,0.45,0.45,0.45,out.revolver.verts.length/9)
    out.revolver.verts.push(...(m.verts))
    out.revolver.index.push(...(m.index))
    bindAndSetMeshBuffers(out.revolver)
    
    out.sniper={}
    out.sniper.verts=[]
    out.sniper.index=[]
    out.sniper.offset=[1,-1,-1.5]
    m=createBoxMesh(0,0,0,0.15,0.5,0.2,0.1,0.1,0.1,0)
    out.sniper.verts.push(...(m.verts))
    out.sniper.index.push(...(m.index))
    m=createBoxMesh(0,0.25,-0.65,0.25,0.35,1.75,0,0.2,0,out.sniper.verts.length/9)
    out.sniper.verts.push(...(m.verts))
    out.sniper.index.push(...(m.index))
    m=createBoxMesh(0,0.6,-0.45,0.15,0.5,0.3,0.1,0.1,0.1,out.sniper.verts.length/9)
    out.sniper.verts.push(...(m.verts))
    out.sniper.index.push(...(m.index))
    m=createCylinderMesh(0,0.8,-0.45,0.15,0.5,10,0.2,0.2,0.2,out.sniper.verts.length/9)
    out.sniper.verts.push(...(m.verts))
    out.sniper.index.push(...(m.index))
    m=createCylinderMesh(0,0.8,-0.45,0.075,0.575,10,0.5,0.5,1,out.sniper.verts.length/9)
    out.sniper.verts.push(...(m.verts))
    out.sniper.index.push(...(m.index))
    bindAndSetMeshBuffers(out.sniper)
    
    out.reverse={}
    out.reverse.verts=[]
    out.reverse.index=[]
    out.reverse.offset=[1,-0.8,-1.5]
    m=createBoxMesh(0,0,0,0.5,0.8,0.01,1,1,1,0)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0,0,0,0.5*0.925,0.8*0.925,0.0125,0,0.5,0,out.reverse.verts.length/9)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0,0,0,0.5*0.55,0.8*0.65,0.015,1,1,1,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(-0.025,0.025,0,0.025,0.1,0.0175,0,0.5,0,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0.025,-0.025,0,0.025,0.1,0.0175,0,0.5,0,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0,0.07,0,0.04,0.04,0.0175,0,0.5,0,out.reverse.verts.length/9,0,0,-30-45)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0,-0.07,0,0.04,0.04,0.0175,0,0.5,0,out.reverse.verts.length/9,0,0,30+45)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(-0.1625,0.3,0,0.015,0.075,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(-0.145,0.2575,0,0.015,0.075,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(-0.145,0.33,0,0.02,0.02,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30-45)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(-0.169,0.225,0,0.02,0.02,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30-45)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0.1625,-0.3,0,0.015,0.075,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0.145,-0.2575,0,0.015,0.075,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0.145,-0.33,0,0.02,0.02,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30-45)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    m=createBoxMesh(0.1675,-0.225,0,0.02,0.02,0.0175,1,1,1,out.reverse.verts.length/9,0,0,-30-45)
    out.reverse.verts.push(...(m.verts))
    out.reverse.index.push(...(m.index))
    bindAndSetMeshBuffers(out.reverse)
    
    out.lantern={}
    out.lantern.verts=[]
    out.lantern.index=[]
    out.lantern.offset=[1,-0.75,-1.5]
    m=createBoxMesh(0,0.15,0.1,0.05,0.05,0.95,0.5,0.25,0,0)
    out.lantern.verts.push(...(m.verts))
    out.lantern.index.push(...(m.index))
    m=createBoxMesh(0,-0.1,-0.25,0.025,0.5,0.025,0.15,0.15,0.15,out.lantern.verts.length/9)
    out.lantern.verts.push(...(m.verts))
    out.lantern.index.push(...(m.index))
    m=createSphereMesh(0,-0.2,-0.25,0.2,2,2,0.5,0.13,out.lantern.verts.length/9)
    out.lantern.verts.push(...(m.verts))
    out.lantern.index.push(...(m.index))
    m=createCylinderMesh(0,-0.25,-0.25,0.175,0.15,10,2,1,0,out.lantern.verts.length/9,90,0,0)
    out.lantern.verts.push(...(m.verts))
    out.lantern.index.push(...(m.index))
    bindAndSetMeshBuffers(out.lantern)
    
    out.banana={}
    out.banana.verts=[]
    out.banana.index=[]
    out.banana.offset=[1.25,-0.75,-1.5]
    m=createCylinderMesh(0,0,-0.2,0.15,0.5,10,1,1,0,0,90,0,0)
    out.banana.verts.push(...(m.verts))
    out.banana.index.push(...(m.index))
    m=createCylinderMesh(0,0.32,-0.26,0.15,0.35,10,1,1,0,out.banana.verts.length/9,65,0,0,0.05)
    out.banana.verts.push(...(m.verts))
    out.banana.index.push(...(m.index))
    m=createCylinderMesh(0,-0.32,-0.26,0.15,0.35,10,1,1,0,out.banana.verts.length/9,-65,0,0,0.05)
    out.banana.verts.push(...(m.verts))
    out.banana.index.push(...(m.index))
    m=createCylinderMesh(0,0.39,-0.3,0.0475,0.35,10,0.1,0.05,0,out.banana.verts.length/9,65,0,0)
    out.banana.verts.push(...(m.verts))
    out.banana.index.push(...(m.index))
    m=createCylinderMesh(0,-0.39,-0.3,0.0475,0.35,10,0.1,0.05,0,out.banana.verts.length/9,-65,0,0)
    out.banana.verts.push(...(m.verts))
    out.banana.index.push(...(m.index))
    bindAndSetMeshBuffers(out.banana)
    
    out.shard={}
    out.shard.verts=[]
    out.shard.index=[]
    out.shard.offset=[1.25,-1.1,-1.8]
    m=createBoxMesh(0,0,0,0.1,0.4,0.4,0,0.7,1,out.shard.verts.length/9)
    out.shard.verts.push(...(m.verts))
    out.shard.index.push(...(m.index))
    m=createBoxMesh(0,0,-0.2,0.1,0.4*MATH.SIN_45,0.4*MATH.SIN_45,0,0.7,1,out.shard.verts.length/9,45,0,0)
    out.shard.verts.push(...(m.verts))
    out.shard.index.push(...(m.index))
    bindAndSetMeshBuffers(out.shard)
    
    out.ball={}
    m=icosphere(2)
    out.ball.verts=[]
    out.ball.offset=[1.25,-1.1,-1.8]
    for(let i=0,l=m.verts.length;i<l;i+=3){
        out.ball.verts.push(m.verts[i]*0.5,m.verts[i+1]*0.5,m.verts[i+2]*0.5,0.08,1,0.45,m.verts[i],m.verts[i+1],m.verts[i+2])
    }
    out.ball.index=m.index
    bindAndSetMeshBuffers(out.ball)
    
    out.wand={}
    out.wand.verts=[]
    out.wand.index=[]
    out.wand.offset=[1.25,-1.1,-1.8]
    m=createCylinderMesh(0,0,0,0.05,0.9,10,0,0,0,out.wand.verts.length/9,90,0,0)
    out.wand.verts.push(...(m.verts))
    out.wand.index.push(...(m.index))
    m=createCylinderMesh(0,0.5,0,0.05,0.1,10,1,1,1,out.wand.verts.length/9,90,0,0)
    out.wand.verts.push(...(m.verts))
    out.wand.index.push(...(m.index))
    bindAndSetMeshBuffers(out.wand)
    
    return out
    
})({})

class Trail {
    
    constructor(params){
        
        this.len=params.len
        this.inv_len=1/params.len
        this.thicknessRange=params.thicknessRange
        this.thicknessLimit=params.thicknessLimit||params.thicknessRange
        this.rainbow=params.rainbow
        this.colorRange=params.colorRange
        this.width=params.width||1
        this.height=params.height||1
        this.detail=params.detail||'Medium'
        
        this.getThickness=function(t){
            
            return MATH.constrain(MATH.lerp(this.thicknessRange[0],this.thicknessRange[1],t),this.thicknessLimit[0],this.thicknessLimit[1])
            
        }
        
        this.getColor=function(t){
            
            if(this.rainbow){
                
                return [...MATH.HSBToRGB(t*this.len*15,255,255),0.5]
            } else {
                
                return vec4.lerp([],this.colorRange[0],this.colorRange[1],t)
            }
        }
        
        this.data=[]
    }
    
    add(pos){
        
        this.data.push(pos)
        
        if(this.data.length>this.len){
            
            this.data.shift()
        }
    }
    
    remove(){
        
        this.data.shift()
    }
    
    update(){
        
        for(let i in this.data){
            
            if(i>0){
            
                let t=i*this.inv_len,_t=(i-1)*this.inv_len
                
                LineRenderer.add(this.data[i],this.data[i-1],this.getThickness(_t),this.getThickness(t),this.getColor(_t),this.getColor(t),this.width,this.height,this.detail)
                
            }
        }
    }
}

let player=(function(out){
    
    out.levelTime=0
    
    out.sound=false
    out.soundTimer=0
    out.soundPos=[]
    
    out.addSound=(sound,pos,cooldown,volume)=>{
        
        if(frameCount%cooldown!==0&&cooldown){return}
        
        out.sound=sound
        out.soundTimer=volume
        out.soundPos=pos
    }
    
    out.sunFlareSample=new Uint8Array(4)
    
    out.currentWeapon='hand'
    out.walkSpeed=3.5
    out.friction=0.85
    out.crouch_friction=0.45
    out.airResistance=0.025
    out.crouch_airResistance=0
    out.jumpPower=2.8
    out.timeMultiplier=1
    out.timeTimer=0
    
    out.radius=0.5
    out._height=1.25
    out.height=out._height
    out.crouching=false
    out.pickUpCoolDown=0
    
    out.playerShape=new CANNON.Box(new CANNON.Vec3(out.radius,out._height,out.radius))
    
    out.body=new CANNON.Body({
        
        fixedRotation:true,
        position:new CANNON.Vec3(0,2,10),
        mass:5,
        collisionFilterGroup:PLAYER_PHYSICS_GROUP,
        collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|LAVA_PHYSICS_GROUP,
        material:slipperyMaterial,
        allowSleep:false
    })
    
    out.body.addShape(out.playerShape)
    out.body.addShape(new CANNON.Sphere(out.radius),new CANNON.Vec3(0,-out.height,0))
    
    physicsWorld.addBody(out.body)
    
    out.body.addEventListener('collide',function(e){
        
        let hitBody=e.body
        
        out.grounded=-e.contact.ni.y>0.25
        
        if(hitBody.collisionFilterGroup===STATIC_PHYSICS_GROUP && !hitBody.fixedRotation && Math.abs(e.contact.ni.y)<0.01 && user.keys[' ']){
            
            if(Math.random()<0.01){
                
                player.timeTimer=5
            }
            
            player.addSound('Parkour noises',false,false,15)
            
            let st=3.6
            
            st+=e.contact.ni.dot(out.body.velocity)
            
            out.body.velocity.x+=-e.contact.ni.x*st
            out.body.velocity.y=2.75
            out.body.velocity.z+=-e.contact.ni.z*st
            
        }
    })
    
    out.holdingBody=new CANNON.Body({
        
        position:new CANNON.Vec3(0,0,0),
        mass:0,
        shape:new CANNON.Sphere(1),
        collisionFilterGroup:STATIC_PHYSICS_GROUP,
        collisionFilterMask:0
    })
    
    
    out.yaw=out.pitch=0
    out.sensitivity=0.005
    out.useBloom=true
    out.useSSAO=false
    out.displayScreenParticles=true
    out.fov=85
    out.grounded=false
    out.near=0.1
    out.far=10000
    out.res={}
    
    out.lookDir=NEG_Z.slice()
    out.lookQuat=[]
    out.rotationMatrix=[]
    out.weaponMatrix=new Float32Array(16)
    out.viewMatrix=new Float32Array(16)
    
    out.weaponReload=0
    
    out.setProjectionMatrix=function(fov,aspect,zn,zf){
        
        let f=Math.tan(MATH.HALF_PI-fov*MATH.HALF_TO_RAD)
        let rangeInv=1/(zn-zf)
        out.projectionMatrix=Float32Array.of(f/aspect,0,0,0,0,f,0,0,0,0,(zn+zf)*-rangeInv,-1,0,0,zn*zf*rangeInv*2,0)
    }
    
    out.setProjectionMatrixFOV=function(fov){
        
        let f=Math.tan(MATH.HALF_PI-fov*MATH.HALF_TO_RAD)
        out.projectionMatrix=Float32Array.of(f/aspect,0,0,0,0,f,0,0,0,0,out.projectionMatrix[10],-1,0,0,out.projectionMatrix[14],0)
    }
    
    out.setProjectionMatrix(out.fov,aspect,out.near,out.far)
    
    out.applyRecoil=function(st=1){
        
        st=-st
        out.body.velocity.x+=out.lookDir[0]*st
        out.body.velocity.y+=out.lookDir[1]*st
        out.body.velocity.z+=out.lookDir[2]*st
    }
    
    out.updateCamera=function(){
        
		let c1=out.cosPitch,
		    s1=out.sinPitch,
		    c2=out.cosYaw,
            s2=out.sinYaw,
            x=-out.body.position.x,
            y=-out.body.position.y-out.height,
            z=-out.body.position.z,
            a=out.projectionMatrix,
        //z translation computed here because its used twice
            z_translation=-(z*c2*c1+y*s1-x*s2*c1)
        
		out.rotationMatrix[0]=c2
        out.rotationMatrix[1]=s2*s1
        out.rotationMatrix[2]=s2*c1
        out.rotationMatrix[3]=0
        out.rotationMatrix[4]=0
        out.rotationMatrix[5]=c1
        out.rotationMatrix[6]=-s1
        out.rotationMatrix[7]=0
        out.rotationMatrix[8]=s2
        out.rotationMatrix[9]=c2*-s1
        out.rotationMatrix[10]=-c2*c1
        out.rotationMatrix[11]=0
        //no translation for the rotation matrix. They are substituted in at the projection-rotation multiplication
        out.rotationMatrix[12]=0
        out.rotationMatrix[13]=0
        out.rotationMatrix[14]=0
        out.rotationMatrix[15]=1
        
        out.lookDir[0]=out.rotationMatrix[2]
        out.lookDir[1]=out.rotationMatrix[6]
        out.lookDir[2]=out.rotationMatrix[10]
        
        mat4.fromRotationTranslation(out.weaponMatrix,quat.fromEuler([],player.pitch*MATH.TO_DEG,player.yaw*MATH.TO_DEG,0),[out.body.position.x,out.body.position.y+out.height,out.body.position.z])
        
        if(weapons[out.currentWeapon].coolDown>=weapons[out.currentWeapon+'_coolDown']-dt){
            
            out.weaponReload=(~~(weapons[out.currentWeapon+'_coolDown']*0.075)+2)*MATH.TWO_PI*(out.currentWeapon==='wand'?4:1)
        }
        
        out.weaponReload-=out.weaponReload*dt*0.25
        
        let b=out.rotationMatrix
        
        out.viewMatrix[0]=b[0]*a[0]
        out.viewMatrix[1]=b[1]*a[5]
        out.viewMatrix[2]=b[2]
        out.viewMatrix[3]=b[2]
        out.viewMatrix[4]=0
        out.viewMatrix[5]=b[5]*a[5]
        out.viewMatrix[6]=b[6]
        out.viewMatrix[7]=b[6]
        out.viewMatrix[8]=b[8]*a[0]
        out.viewMatrix[9]=b[9]*a[5]
        out.viewMatrix[10]=b[10]
        out.viewMatrix[11]=b[10]//translation elements manually substituted in at elements 12,13,14
        out.viewMatrix[12]=(x*c2+z*s2)*a[0]
        out.viewMatrix[13]=(x*s2*s1+y*c1-z*c2*s1)*a[5]
        out.viewMatrix[14]=z_translation*a[10]+a[14]
        out.viewMatrix[15]=z_translation
        
        gl.uniformMatrix4fv(glCache.static_viewMatrix,gl.FALSE,out.viewMatrix)
        
    }
    
    out.updateCameraMatrices=function(){
        
        let c1=out.cosPitch,
		    s1=out.sinPitch,
		    c2=out.cosYaw,
            s2=out.sinYaw,
            x=-out.body.position.x,
            y=-out.body.position.y-out.height,
            z=-out.body.position.z,
            a=out.projectionMatrix,
        //z translation computed here because its used twice
            z_translation=-(z*c2*c1+y*s1-x*s2*c1)
        
		out.rotationMatrix[0]=c2
        out.rotationMatrix[1]=s2*s1
        out.rotationMatrix[2]=s2*c1
        out.rotationMatrix[3]=0
        out.rotationMatrix[4]=0
        out.rotationMatrix[5]=c1
        out.rotationMatrix[6]=-s1
        out.rotationMatrix[7]=0
        out.rotationMatrix[8]=s2
        out.rotationMatrix[9]=c2*-s1
        out.rotationMatrix[10]=-c2*c1
        out.rotationMatrix[11]=0
        //no translation for the rotation matrix. They are substituted in at the projection-rotation multiplication
        out.rotationMatrix[12]=0
        out.rotationMatrix[13]=0
        out.rotationMatrix[14]=0
        out.rotationMatrix[15]=1
        
        out.lookDir[0]=out.rotationMatrix[2]
        out.lookDir[1]=out.rotationMatrix[6]
        out.lookDir[2]=out.rotationMatrix[10]
        
        let b=out.rotationMatrix
        
        out.viewMatrix[0]=b[0]*a[0]
        out.viewMatrix[1]=b[1]*a[5]
        out.viewMatrix[2]=b[2]
        out.viewMatrix[3]=b[2]
        out.viewMatrix[4]=0
        out.viewMatrix[5]=b[5]*a[5]
        out.viewMatrix[6]=b[6]
        out.viewMatrix[7]=b[6]
        out.viewMatrix[8]=b[8]*a[0]
        out.viewMatrix[9]=b[9]*a[5]
        out.viewMatrix[10]=b[10]
        out.viewMatrix[11]=b[10]//translation elements manually substituted in at elements 12,13,14
        out.viewMatrix[12]=(x*c2+z*s2)*a[0]
        out.viewMatrix[13]=(x*s2*s1+y*c1-z*c2*s1)*a[5]
        out.viewMatrix[14]=z_translation*a[10]+a[14]
        out.viewMatrix[15]=z_translation
        
        gl.uniformMatrix4fv(glCache.static_viewMatrix,gl.FALSE,out.viewMatrix)
    }
    
    out.updatePhysics=function(dt){
        
        out.levelTime+=dt
        
        if(player.body.position.y<-50){
            
            player.dead=true
        }
        
        if(out.dead){return}
        
        out.lastFrameCrouching=out.crouching
        
        if(user.keys.shift){
            
            out.crouching=true
            out.height+=(-0.25-out.height)*dt*1.3
            
        } else {
            
            out.crouching=false
            out.height+=(out._height-out.height)*dt*1.3
        }
        
        if(out.lastFrameCrouching!==out.crouching){
            
            if(out.crouching){
                
                out.body.position.y-=out._height-out.radius*2*out._height
                out.playerShape.halfExtents.set(out.radius,out.radius*0.1,out.radius)
                out.playerShape.updateConvexPolyhedronRepresentation()
                out.playerShape.updateBoundingSphereRadius()
                out.body.updateBoundingRadius()
                out.body.computeAABB()
                out.body.updateMassProperties()
                
            } else {
                
                out.body.position.y+=out._height-out.radius*2*out._height
                out.playerShape.halfExtents.set(out.radius,out._height,out.radius)
                out.playerShape.updateConvexPolyhedronRepresentation()
                out.playerShape.updateBoundingSphereRadius()
                out.body.updateBoundingRadius()
                out.body.computeAABB()
                out.body.updateMassProperties()
            }
        }
        
        out.cosPitch=Math.cos(-player.pitch)
        out.sinPitch=Math.sin(-player.pitch)
        out.cosYaw=Math.cos(-player.yaw)
        out.sinYaw=Math.sin(-player.yaw)
        
        let sdir=out.sinYaw,
            cdir=-out.cosYaw,
            s=-out.walkSpeed*(out.crouching?(out.grounded?0.35:0.1):1)*(out.grounded?1:0.0975)*dt
        
        if(user.keys.d){
            
            out.body.velocity.x+=cdir*s
            out.body.velocity.z-=sdir*s
        }
        
        if(user.keys.w){
            
            out.body.velocity.x-=sdir*s
            out.body.velocity.z-=cdir*s
        }
        
        if(user.keys.a){
            
            out.body.velocity.x-=cdir*s
            out.body.velocity.z+=sdir*s
        }
        
        if(user.keys.s){
            
            out.body.velocity.x+=sdir*s
            out.body.velocity.z+=cdir*s
        }
        
        if(out.grounded){
            
            if(user.keys.w||user.keys.a||user.keys.d||user.keys.s){
                player.addSound('Footsteps',false,10,7)
            }
            
            if(user.keys[' ']){
                
                out.body.velocity.y=out.jumpPower*(out.crouching?1.15:1)
                out.grounded=false
            }
            
            if(out.crouching){
                
                let fx=out.body.velocity.x*out.crouch_friction,
                    fz=out.body.velocity.z*out.crouch_friction
                
                out.body.velocity.x-=fx*dt
                out.body.velocity.z-=fz*dt
                
            } else {
                
                let fx=out.body.velocity.x*out.friction,
                    fz=out.body.velocity.z*out.friction
                
                out.body.velocity.x-=fx*dt
                out.body.velocity.z-=fz*dt
            }
            
        } else {
            
            out.body.position.y+=0.005
            
            if(!out.crouching){
                
                let fx=out.body.velocity.x*out.airResistance,
                    fz=out.body.velocity.z*out.airResistance
                
                out.body.velocity.x-=fx*dt
                out.body.velocity.z-=fz*dt
                
            } else {
                
                let fx=out.body.velocity.x*out.crouch_airResistance,
                    fz=out.body.velocity.z*out.crouch_airResistance
                
                out.body.velocity.x-=fx*dt
                out.body.velocity.z-=fz*dt
            }
        }
        
        out.pickUpCoolDown-=dt
        
        if(user.clickedKeys.e && out.currentWeapon!=='hand'){
            
            if(player.currentWeapon==='reverse' && weapons.reverse.active===false || player.currentWeapon!=='reverse'){
                
                out.pickUpCoolDown=4
                physicsObjects.add(new PhysicsWeapon({pos:[out.body.position.x+out.lookDir[0]*2,out.body.position.y+out.height+out.lookDir[1]*2,out.body.position.z+out.lookDir[2]*2],type:out.currentWeapon,vel:out.lookDir,fromPlayer:true}))
                out.currentWeapon='hand'
            }
        }
    }
    
    out.updatePhysicsFree=function(dt){
        
        if(user.mouseX>=450*width/600){return}
        
        let sdir=out.sinYaw,
            cdir=-out.cosYaw,
            s=-dt*(user.keys.p?2.5:1)
        
        if(user.keys.d){
            
            out.body.position.x+=cdir*s
            out.body.position.z-=sdir*s
        }
        
        if(user.keys.w){
            
            out.body.position.x-=sdir*s
            out.body.position.z-=cdir*s
        }
        
        if(user.keys.a){
            
            out.body.position.x-=cdir*s
            out.body.position.z+=sdir*s
        }
        
        if(user.keys.s){
            
            out.body.position.x+=sdir*s
            out.body.position.z+=cdir*s
        }
        
        if(user.keys[' ']){
            
            out.body.position.y-=s
        }
        
        if(user.keys.shift){
            
            out.body.position.y+=s
        }
        
    }
    
    return out
    
})({})


let weapons=(function(out){
    
    let player_fov=player.fov
    
    out.gun_coolDown=12.5
    
    out.gun=(function(out){
        
        out.coolDown=0
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Gun fires',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            physicsObjects.add(new PhysicsBullet({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch:pitch,
                isPlayer:isPlayer,
                enemyFrom:enemyFrom
                
            }))
            
            for(let i=0;i<5;i++){
                
                let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                    c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
                
                ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(40,150),col:c,life:MATH.random(15,35)})
                
            }
        }
        
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.025,0.025],
            colorRange:[[0.5,0.5,0.5,0],[0.5,0.5,0.5,10]]
        })
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.gun_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(out.coolDown>weapons.gun_coolDown*0.25){
                
                let gunTip=[0,0.25,-0.25-0.375]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.gun.offset)
                
                out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
                
            } else {out.trail.remove()}
            
            out.trail.update()
        }
        
        return out
        
    })({})
    
    out.grapplingHook=(function(out){
        
        out.active=false
        out.pos=[0,0,0]
        out.cd=5
        
        out.update=function(dt){
            
            out.cd-=dt
            
            if(user.clicked_use && out.cd<0){
                
                out.active=!out.active
                
                if(out.active){
                    
                    let result=new CANNON.RaycastResult()
                    let from=new CANNON.Vec3()
                    from.copy(player.body.position)
                    from.y+=player.height
                    let to=new CANNON.Vec3()
                    to.copy(from)
                    let r=100
                    to.x+=player.lookDir[0]*r
                    to.y+=player.lookDir[1]*r+player.height
                    to.z+=player.lookDir[2]*r
                    physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP},result)
                    
                    if(result.hasHit && result.body.collisionFilterGroup==STATIC_PHYSICS_GROUP){
                        
                        player.weaponReload=MATH.TWO_PI*2
                        let p=result.hitPointWorld
                        
                        player.addSound('Grappling hook attaches',[p.x,p.y,p.z],false,20)
                        
                        out.pos=[p.x,p.y,p.z]
                        out.vecPos=p
                        out.len=player.body.position.distanceTo(p)
                        
                        for(let j=0,l=~~(Math.random()*6+4);j<l;j++){
                            let c=MATH.random(0.4,0.6)
                            
                            ParticleRenderer.add({x:p.x,y:p.y,z:p.z,vx:MATH.random(-0.4,0.4),vy:MATH.random(0.2,1),vz:MATH.random(-0.4,0.4),grav:-0.15,size:MATH.random(50,100),col:[c,c,c],life:10})
                        }
                        
                    } else {
                        
                        out.active=false
                    }
                }
            }
            
            if(out.active){
                
                player.body.position.vsub(out.vecPos)
                player.body.position.scale(out.len/player.body.position.distanceTo(out.vecPos))
                player.body.position.vadd(out.vecPos)
                
                let px=player.body.position.x,
                    py=player.body.position.y,
                    pz=player.body.position.z,
                    x=player.body.position.x-out.vecPos.x,
                    y=player.body.position.y-out.vecPos.y,
                    z=player.body.position.z-out.vecPos.z,
                    d=out.len/Math.sqrt(x*x+y*y+z*z),
                    st=15
                x*=d
                y*=d
                z*=d
                
                player.body.position.x=x+out.vecPos.x
                player.body.position.y=y+out.vecPos.y
                player.body.position.z=z+out.vecPos.z
                
                player.body.velocity.x+=(player.body.position.x-px)*st
                player.body.velocity.y+=(player.body.position.y-py)*st
                player.body.velocity.z+=(player.body.position.z-pz)*st
                
                LineRenderer.add([player.body.position.x+player.lookDir[0],player.body.position.y+player.height+player.lookDir[1],player.body.position.z+player.lookDir[2]],[out.pos[0],out.pos[1],out.pos[2]],0.1,0.1,[0,0,0,1],[0,0,0,1])
            }
            
        }
        
        return out
        
    })({})
    
    out.hand=(function(out){
        
        out.update=function(){
            
            if(user.pressing_use && !player.isHolding){
                
                let result=new CANNON.RaycastResult()
                let from=new CANNON.Vec3()
                from.copy(player.body.position)
                from.y+=player.height
                let to=new CANNON.Vec3()
                to.copy(from)
                let r=12.5
                to.x+=player.lookDir[0]*r
                to.y+=player.lookDir[1]*r+player.height
                to.z+=player.lookDir[2]*r
                physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP},result)
                
                if(result.hasHit&&result.body.collisionFilterGroup===DYNAMIC_PHYSICS_GROUP){
                    
                    let h=result.hitPointWorld,p=result.body.position
                    for(let _i in physicsObjects.objects){
                        
                        if(physicsObjects.objects[_i].body===result.body && physicsObjects.objects[_i] instanceof PhysicsWeapon){
                            if(player.pickUpCoolDown<=0){
                                
                                player.currentWeapon=physicsObjects.objects[_i].type
                                physicsObjects.objects[_i].splice=true
                                weapons[player.currentWeapon].coolDown=5
                                if(player.currentWeapon==='reverse'){weapons.reverse.reset()}
                            }
                            
                            return
                        }
                    }
                    
                    let localHit=new CANNON.Vec3(p.x-h.x,p.y-h.y,p.z-h.z)
                    
                    player.isHolding=result
                    player.holdingSpring=new CANNON.Spring(result.body,player.holdingBody,{
                        localAnchorB:new CANNON.Vec3(0,0,0),
                        localAnchorA:localHit,
                        restLength:0.3,
                        stiffness:15,
                        damping:5,
                    })
                }
                
                else {player.isHolding=false}
                
            } else if(!user.pressing_use){
                
                player.isHolding=false
                player.holdingSpring=false
                
            } else if(player.isHolding){
                
                let d=4
                player.holdingBody.position.x=player.body.position.x+player.lookDir[0]*d
                player.holdingBody.position.y=player.body.position.y+player.height+player.lookDir[1]*d
                player.holdingBody.position.z=player.body.position.z+player.lookDir[2]*d
                
                player.isHolding.body.wakeUp()
                
                if(player.isHolding.body.limbs){
                    
                    for(let k in player.isHolding.body.limbs){
                        
                        player.isHolding.body.limbs[k].body.wakeUp()
                    }
                }
                player.holdingSpring.applyForce()
                
                if(player.isHolding.body.angularDamping===0.75){
                    
                    player.isHolding.body.turnSad()
                }
                
                LineRenderer.add([player.holdingBody.position.x,player.holdingBody.position.y,player.holdingBody.position.z],[player.isHolding.body.position.x,player.isHolding.body.position.y,player.isHolding.body.position.z],0.05,0.1,[0.95,1,1,1],[0.95,1,1,1])
            }
        }
        
        return out
        
    })({})
    
    out.shotgun_coolDown=22.5
    
    out.shotgun=(function(out){
        
        out.coolDown=0
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.025,0.025],
            colorRange:[[0.5,0.5,0.5,0],[0.5,0.5,0.5,10]]
        })
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Shotgun blasts',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            let V=0.15
            
            for(let i=0;i<5;i++){
                
                physicsObjects.add(new PhysicsBullet({
                    
                    pos:[x,y,z],
                    yaw:yaw+MATH.random(-V,V),
                    pitch:pitch+MATH.random(-V,V),
                    isPlayer:isPlayer,
                    enemyFrom:enemyFrom
                }))
            }
            
            for(let i=0;i<5;i++){
                
                let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                    c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
                
                ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(40,150),col:c,life:MATH.random(15,35)})
                
            }
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.shotgun_coolDown
                player.applyRecoil(6)
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(out.coolDown>weapons.shotgun_coolDown*0.25){
                
                let gunTip=[0,0.1,-0.75]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.shotgun.offset)
                
                out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
                
            } else {out.trail.remove()}
            
            out.trail.update()
        }
        
        return out
        
    })({})
    
    out.boomer_coolDown=25
    
    out.boomer=(function(out){
        
        out.coolDown=0
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.025,0.025],
            colorRange:[[0.5,0.5,0.5,0],[0.5,0.5,0.5,10]]
        })
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Grenade launcher launches',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            physicsObjects.add(new PhysicsBomb({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch:pitch,
                speed:4,
                isPlayer:isPlayer,
                enemyFrom:enemyFrom
                
            }))
            
            for(let i=0;i<10;i++){
                
                let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                    c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
                
                ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(40,150),col:c,life:MATH.random(15,35)})
                
            }
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.boomer_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(out.coolDown>weapons.boomer_coolDown*0.25){
                
                let gunTip=[0,0.2,-0.5]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.boomer.offset)
                
                out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
                
            } else {out.trail.remove()}
            
            out.trail.update()
        }
        
        return out
        
    })({})
    
    out.bow_coolDown=10
    
    out.bow=(function(out){
        
        out.coolDown=0
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Bow twangs',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            let incx,incy
            
            if(!isPlayer){
                
                incx=MATH.random(-0.075,0.075)
                incy=MATH.random(-0.075,0.075)
                
            } else {
                
                incx=MATH.random(-0.025,0.025)
                incy=MATH.random(-0.025,0.025)
            }
            
            physicsObjects.add(new PhysicsArrow({
                
                pos:[x,y,z],
                speed:5.75,
                yaw:yaw+incx,
                pitch:pitch+incy,
                isPlayer:isPlayer,
                enemyFrom:enemyFrom
            }))
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.bow_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
        }
        
        return out
        
    })({})
    
    out.railgun_coolDown=17.5
    
    out.railgun=(function(out){
        
        out.coolDown=0
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.025,0.025],
            colorRange:[[0.5,0.5,0.5,0],[0.5,0.5,0.5,10]]
        })
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Railgun charges',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            if(!isPlayer){
                
                yaw+=MATH.random(-0.15,0.15)
                pitch+=MATH.random(-0.15,0.15)
            }
            
            physicsObjects.add(new PhysicsRail({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch,
                isPlayer:isPlayer,
                enemyFrom:enemyFrom
            }))
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.keys.c){
                
                player_fov-=(player_fov-10)*0.1
                player.scoping=true
                
            } else {
                
                player_fov-=(player_fov-player.fov)*0.1
                player.scoping=false
            }
            
            player.setProjectionMatrixFOV(player_fov)
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.railgun_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(out.coolDown>weapons.railgun_coolDown*0.25){
                
                let gunTip=[0,0.1,-1.25]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.railgun.offset)
                
                out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
                
            } else {out.trail.remove()}
            
            out.trail.update()
        }
        
        return out
        
    })({})
    
    out.candycane_coolDown=10
    
    out.candycane=(function(out){
        
        out.coolDown=0
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                player.addSound('Candycane stabs',false,false,20)
                
                out.coolDown=weapons.candycane_coolDown
                
                let result=new CANNON.RaycastResult(),x=player.body.position.x,y=player.body.position.y,z=player.body.position.z,r=8,
                from=new CANNON.Vec3(x,y+player.height,z),
                to=new CANNON.Vec3(x+player.lookDir[0]*r,y+player.height+player.lookDir[1]*r,z+player.lookDir[2]*r)
                
                physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP},result)
                if(result.hasHit){
                    
                    if(result.body.collisionFilterGroup===STATIC_PHYSICS_GROUP && result.body.fixedRotation){
                        
                        result.body.collisionFilterGroup=0
                    }
                    
                    if(result.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && result.body.angularDamping!==0.69){
                        
                        let st=15
                        result.body.wakeUp()
                        result.body.applyImpulse(new CANNON.Vec3(player.lookDir[0]*st,player.lookDir[1]*st,player.lookDir[2]*st),from)
                        
                    } else {
                        
                        result.body.collisionFilterGroup=0
                    }
                }
                
                x+=player.lookDir[0]
                y+=player.lookDir[1]+player.height
                z+=player.lookDir[2]
                
                let [vx,vy,vz]=player.lookDir
                
                for(let i=0;i<10;i++){
                    
                    let _c=~~(Math.random()*2),
                        c=_c?[0.9,0,0]:[1,1,1]
                    
                    ParticleRenderer.add({x:x+MATH.random(-0.5,0.5),y:y+MATH.random(-0.5,0.5),z:z+MATH.random(-0.5,0.5),vx:MATH.random(-0.2,0.2)+vx,vy:Math.random()*0.5+vy,vz:MATH.random(-0.2,0.2)+vz,grav:-0.05,size:MATH.random(40,80),col:c,life:MATH.random(15,35)})
                }
            }
            
        }
        
        return out
        
    })({})
    
    out.sword_coolDown=25
    
    out.sword=(function(out){
        
        out.coolDown=0
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.clicked_use && out.coolDown<=0){
                
                player.addSound('Sword flourishes',false,false,20)
                
                out.coolDown=weapons.sword_coolDown
                
                let dir=[player.lookDir[0],player.lookDir[2]],st=6
                vec2.normalize(dir,dir)
                
                player.body.position.y+=0.25
                player.grounded=false
                player.body.velocity.set(dir[0]*st,3,dir[1]*st)
                
                let result=new CANNON.RaycastResult(),x=player.body.position.x,y=player.body.position.y,z=player.body.position.z,r=20,
                from=new CANNON.Vec3(x,y+player.height,z),
                to=new CANNON.Vec3(x+player.lookDir[0]*r,y+player.height+player.lookDir[1]*r,z+player.lookDir[2]*r)
                
                physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP},result)
                if(result.hasHit){
                    
                    if(result.body.collisionFilterGroup===STATIC_PHYSICS_GROUP && result.body.fixedRotation){
                        
                        result.body.collisionFilterGroup=0
                    }
                    
                    if(result.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && result.body.angularDamping!==0.69){
                        
                        let st=15
                        result.body.wakeUp()
                        result.body.applyImpulse(new CANNON.Vec3(player.lookDir[0]*st,player.lookDir[1]*st,player.lookDir[2]*st),from)
                        
                    } else {
                        
                        result.body.collisionFilterGroup=0
                    }
                }
                
                x+=player.lookDir[0]
                y+=player.lookDir[1]+player.height
                z+=player.lookDir[2]
                
                let [vx,vy,vz]=player.lookDir
                
                for(let i=0;i<10;i++){
                    
                    let c=[Math.random()*0.3+0.2]
                    
                    c=[c,c,c]
                    
                    ParticleRenderer.add({x:x+MATH.random(-0.5,0.5),y:y+MATH.random(-0.5,0.5),z:z+MATH.random(-0.5,0.5),vx:MATH.random(-0.2,0.2)+vx,vy:Math.random()*0.5+vy,vz:MATH.random(-0.2,0.2)+vz,grav:-0.05,size:MATH.random(20,40),col:c,life:MATH.random(15,35)})
                }
            }
            
        }
        
        return out
        
    })({})
    
    out.revolver_coolDown=15
    
    out.revolver=(function(out){
        
        out.coolDown=0
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Revolver spins',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            if(!isPlayer){
                
                yaw+=MATH.random(-0.15,0.15)
                pitch+=MATH.random(-0.15,0.15)
            }
            
            physicsObjects.add(new PhysicsRail({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch,
                isPlayer:isPlayer,
                render:false,
                enemyFrom:enemyFrom
                
            }))
            
            for(let i=0;i<5;i++){
                
                let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                    c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
                
                ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(40,150),col:c,life:MATH.random(15,35)})
                
            }
        }
        
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.025,0.025],
            colorRange:[[0.5,0.5,0.5,0],[0.5,0.5,0.5,10]]
        })
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.revolver_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(out.coolDown>weapons.revolver_coolDown*0.25){
                
                let gunTip=[0,0.25,-0.25-0.375]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.revolver.offset)
                
                out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
                
            } else {out.trail.remove()}
            
            out.trail.update()
        }
        
        return out
        
    })({})
    
    out.sniper_coolDown=20
    
    out.sniper=(function(out){
        
        out.coolDown=0
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Sniper shoots',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            if(!isPlayer){
                
                yaw+=MATH.random(-0.1,0.1)
                pitch+=MATH.random(-0.1,0.1)
            }
            
            physicsObjects.add(new PhysicsRail({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch,
                isPlayer:isPlayer,
                render:false,
                enemyFrom:enemyFrom
            }))
            
            for(let i=0;i<5;i++){
                
                let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                    c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
                
                ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(40,150),col:c,life:MATH.random(15,35)})
                
            }
        }
        
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.025,0.025],
            colorRange:[[0.5,0.5,0.5,0],[0.5,0.5,0.5,10]]
        })
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.keys.c){
                
                player_fov-=(player_fov-1)*0.075
                player.scoping=true
                
            } else {
                
                player_fov-=(player_fov-player.fov)*0.1
                player.scoping=false
            }
            
            player.setProjectionMatrixFOV(player_fov)
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.sniper_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(out.coolDown>weapons.sniper_coolDown*0.25){
                
                let gunTip=[0,0.25,-0.25-1.375]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.sniper.offset)
                
                out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
                
            } else {out.trail.remove()}
            
            out.trail.update()
        }
        
        return out
        
    })({})
    
    out.reverse_coolDown=100
    
    out.reverse=(function(out){
        
        out.coolDown=0
        out.timer=Infinity
        
        out.reset=function(){
            
            out.timer=Infinity
            out.coolDown=0
            out.active=false
        }
        
        out.activate=function(){
            
            out.coolDown=out.reverse_coolDown
            out.active=true
            out.timer=10
            player.weaponReload=20
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            out.timer-=dt
            
            if(out.active&&out.timer<=0){
                
                player.addSound('UNO reverse card tears',false,false,20)
                
                player.currentWeapon='hand'
                
                let [lx,ly,lz]=player.lookDir
                
                lx*=0.75
                ly*=0.75
                lz*=0.75
                
                for(let i=0;i<20;i++){
                    
                    let c=[0,MATH.random(0.5,0.95),0],x=player.body.position.x+Math.random()*3,y=player.body.position.y+Math.random()*3,z=player.body.position.z+Math.random()*3
                    
                    x+=player.lookDir[0]
                    y+=player.lookDir[1]
                    z+=player.lookDir[2]
                    
                    ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.3,0.3)+lx,vy:MATH.random(-0.3,0.3)+ly,vz:MATH.random(-0.3,0.3)+lz,grav:0,size:MATH.random(120,200),col:c,life:MATH.random(35,65)})
                }
                
                player.weaponReload=0
            }
            
        }
        
        return out
        
    })({})
    
    out.lantern_coolDown=20
    
    out.lantern=(function(out){
        
        out.coolDown=0
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Lantern flings',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            physicsObjects.add(new PhysicsLantern({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch:pitch,
                isPlayer:isPlayer,
                enemyFrom:enemyFrom,
                speed:5
            }))
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.lantern_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
            if(frameCount%25===0){
                
                let gunTip=[0,0.25,-0.25-0.375]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,meshes.lantern.offset)
                
                let [x,y,z]=vec3.transformMat4(gunTip,gunTip,player.weaponMatrix)
                ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.075,0.075),vy:Math.random()*0.08,vz:MATH.random(-0.075,0.075),grav:0.03,life:35,col:[1,0.15,0.08],size:MATH.random(10,30)})
            }
            
        }
        
        return out
        
    })({})
    
    out.banana_coolDown=7.5
    
    out.banana=(function(out){
        
        out.coolDown=0
        
        out.shoot=function(x,y,z,yaw,pitch){
            
            player.addSound('Banana catapults',false,false,20)
            
            physicsObjects.add(new PhysicsBanana({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch:pitch,
                speed:5,
                setFlyingStatus:out
            }))
        }
        
        out.flying=false
        out.render=true
        
        out.update=function(dt){
            
            out.coolDown-=dt
            out.render=!out.flying
            
            if(user.pressing_use && out.coolDown<=0 && !out.flying){
                
                out.coolDown=weapons.banana_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
            }
            
        }
        
        return out
        
    })({})
    
    out.shard_coolDown=5
    
    out.shard=(function(out){
        
        out.coolDown=0
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                player.addSound('Glass shard slices',false,false,20)
                
                out.coolDown=weapons.shard_coolDown
                
                let result=new CANNON.RaycastResult(),x=player.body.position.x,y=player.body.position.y,z=player.body.position.z,r=10,
                from=new CANNON.Vec3(x,y+player.height,z),
                to=new CANNON.Vec3(x+player.lookDir[0]*r,y+player.height+player.lookDir[1]*r,z+player.lookDir[2]*r)
                
                physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP},result)
                if(result.hasHit){
                    
                    if(result.body.collisionFilterGroup===STATIC_PHYSICS_GROUP && result.body.fixedRotation){
                        
                        result.body.collisionFilterGroup=0
                    }
                    
                    if(result.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && result.body.angularDamping!==0.69){
                        
                        let st=15
                        result.body.wakeUp()
                        result.body.applyImpulse(new CANNON.Vec3(player.lookDir[0]*st,player.lookDir[1]*st,player.lookDir[2]*st),from)
                        
                    } else {
                        
                        result.body.collisionFilterGroup=0
                    }
                }
            }
            
        }
        
        return out
        
    })({})
    
    out.ball_coolDown=12.5
    
    out.ball=(function(out){
        
        out.coolDown=0
        out.renderOffset=meshes.ball.offset.slice()
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            let _x=x,_y=y,_z=z
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
                
                _x-=dx*3*m
                _y-=dy*3*m
                _z-=dz*3*m
            }
            
            if(isPlayer){
                
                _x+=player.lookDir[0]*2.5
                _y+=player.lookDir[1]*2.5
                _z+=player.lookDir[2]*2.5
            }
            
            let b=new PhysicsBouncyBall({
                
                pos:[_x,_y,_z],
                yaw:yaw,
                pitch:pitch,
                speed:20
            })
            
            
            physicsObjects.add(b)
        }
        
        out.trail=new Trail({
            
            len:20,
            thicknessRange:[0,0.5],
            colorRange:[[1,1,0,0],[1,1,0,0.5]],
            height:0.001
        })
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            out.renderOffset[1]+=(-1.1-out.renderOffset[1])*0.025
            
            let gunTip=[0,0,0]
                MATH.rotateX(gunTip,player.weaponReload)
                vec3.add(gunTip,gunTip,out.renderOffset)
            out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
            
            out.trail.update()
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.ball_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
                
                out.renderOffset[1]=-4
            }
            
        }
        
        return out
        
    })({})
    
    out.wand_coolDown=12.5
    
    out.wand=(function(out){
        
        out.renderOffset=meshes.wand.offset.slice()
        out.defaultYPos=out.renderOffset[1]
        out.tossVel=0
        
        out.coolDown=0
        out.trail=new Trail({
            
            len:50,
            thicknessRange:[0.1,0.1],
            rainbow:true,
            width:0.01,
            detail:'Low'
        })
        
        out.shoot=function(x,y,z,yaw,pitch,dx,dy,dz,isPlayer,enemyFrom){
            
            player.addSound('Wand levitates',isPlayer?false:[x,y,z],false,20)
            
            if(dx){
                
                let m=-1/Math.sqrt(dx*dx+dy*dy+dz*dz)
                
                yaw=Math.atan2(dx*m,dz*m)
                pitch=Math.asin(-dy*m)
            }
            
            if(!isPlayer){
                
                yaw+=MATH.random(-0.175,0.175)
                pitch+=MATH.random(-0.175,0.175)
            }
            
            physicsObjects.add(new PhysicsBeam({
                
                pos:[x,y,z],
                yaw:yaw,
                pitch,
                isPlayer:isPlayer,
                enemyFrom:enemyFrom
            }))
        }
        
        out.update=function(dt){
            
            out.coolDown-=dt
            
            if(user.pressing_use && out.coolDown<=0){
                
                out.coolDown=weapons.wand_coolDown
                
                out.shoot(player.body.position.x,player.body.position.y+player.height,player.body.position.z,player.yaw,player.pitch,0,0,0,true)
                
                out.tossVel=0.08
            }
            
            let gunTip=[0,0.525,0]
            MATH.rotateX(gunTip,player.weaponReload)
            vec3.add(gunTip,gunTip,out.renderOffset)
            
            out.trail.add(vec3.transformMat4(gunTip,gunTip,player.weaponMatrix))
            
            out.trail.update()
            
            out.tossVel-=0.0025
            out.renderOffset[1]+=out.tossVel
            
            if(out.renderOffset[1]<=out.defaultYPos){
                
                player.weaponReload*=0.9
                out.renderOffset[1]=out.defaultYPos
            }
        }
        
        return out
        
    })({})
    
    
    return out
    
})({})

uiCanvas.oncontextmenu=function(e){
	e.preventDefault()
}

let user=(function(out){
    
    out.mouseX=out.mouseY=0
    out.mousePressed=out.mouseClicked=false
    out.keys=out.clickedKeys={}
    
    out.update=function(){
        
        out.pressing_use=out.keys.j||out.mousePressed&&user.mouseButton===0
        out.clicked_use=out.clickedKeys.j||out.mouseClicked&&user.mouseButton===0
        out.mouseClicked=false
        out.clickedKeys={}
    }
    
    uiCanvas.onmousedown=function(e){
        
        out.mousePressed=true
        out.mouseClicked=true
        out.mouseButton=e.button
    }
    
    uiCanvas.onmouseup=function(){
        
        out.mousePressed=false
    }
    
    document.onkeydown=function(e){
        
        out.keys[e.key.toLowerCase()]=true
        out.clickedKeys[e.key.toLowerCase()]=true
        
        if(out.keys.p&&currentScene==='play'){
            
            player.paused=true
        }
        
        if(out.keys.r&&currentScene==='play'){
            
            setLevel(currentLevel)
            player.dead=false
            currentScene='play'
            uiCanvas.requestPointerLock()
            ctx.strokeStyle='black'
            ctx.lineWidth=2
            
            uiCanvas.onmousemove=function(e){
                
                user.mouseX=e.x
                user.mouseY=e.y
                
                player.yaw-=e.movementX*player.sensitivity
                player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
            }
            
            uiCanvas.onmousedown=function(e){
            
                user.mousePressed=true
                user.mouseClicked=true
                uiCanvas.requestPointerLock()
                user.mouseButton=e.button
            }
        }
        
        if(e.key==='j'){
            
            out.mouseClicked=true
            out.mousePressed=true
        }
    }
    
    document.onkeyup=function(e){
        
        out.keys[e.key.toLowerCase()]=false
        
        if(e.key==='j'){
            
            out.mousePressed=false
        }
    }
    
    return out
    
})({})

gl.useProgram(staticGeometryProgram)

class Mesh {

    constructor(verts,index){
        
        this.verts=verts||[]
        this.index=index||[]
        
        this.vertBuffer=gl.createBuffer()
        this.indexBuffer=gl.createBuffer()
        
        this.indexAmount=this.index.length
        
        this.bodies=[]
    }
    
    makeMesh(objects,physics=true){
        
        let verts=[],index=[]
        
        if(physics){
            
            for(let i in this.bodies){
                
                physicsWorld.removeBody(this.bodies[i])
            }
            
            this.bodies=[]
        }
        
        for(let i in objects){
            
            if(objects[i].render===false){
                
                continue
            }
            
            let d=objects[i],
                x=d.pos[0],
                y=d.pos[1],
                z=d.pos[2],
                w=d.size[0],
                h=d.size[1],
                l=d.size[2],
                rx=d.rot[0],
                ry=d.rot[1],
                rz=d.rot[2],
                r=d.col[0],
                g=d.col[1],
                b=d.col[2],
                rotQuat=quat.fromEuler([],rx,ry,rz),
                ETC=0,
                texRep=0.5,
                vl=verts.length/11,
                v=[
                    
                    [-0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,-0.5*l],
                ],
                n=[
                    
                    [0,1,0],
                    [0,0,1],
                    [0,0,-1],
                    [1,0,0],
                    [-1,0,0],
                    [0,-1,0],
                ]
            
            if(d.useTex===false){
                
                ETC=0.3
                texRep=0
            }
            
            for(let j in v){
                
                vec3.transformQuat(v[j],v[j],rotQuat)
                vec3.add(v[j],v[j],d.pos)
                
                if(j<6) vec3.transformQuat(n[j],n[j],rotQuat)
            }
            
            if(physics){
                
                this.bodies.push(new CANNON.Body({
                    
                    mass:0,
                    collisionFilterGroup:STATIC_PHYSICS_GROUP,
                    collisionFilterMask:PLAYER_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
                    material:roughMaterial,
                    shape:new CANNON.Box(new CANNON.Vec3(w*0.5,h*0.5,l*0.5)),
                    position:new CANNON.Vec3(x,y,z),
                    quaternion:new CANNON.Quaternion(rotQuat[0],rotQuat[1],rotQuat[2],rotQuat[3])
                }))
                
                this.bodies[this.bodies.length-1].addEventListener('collide',function(e){
                    
                    if(e.body.velocity.lengthSquared()>12 && e.body.collisionFilterGroup!==PLAYER_PHYSICS_GROUP){
                        
                        player.addSound('Object drops',[e.body.position.x,0,e.body.position.z],false,20)
                    }
                    
                    if(e.body.collisionFilterGroup===PLAYER_PHYSICS_GROUP && e.body.velocity.y<-4){
                        
                        //:D
                        player.addSound('Poomph!',false,false,20)
                        
                        if(e.body.velocity.y<-6)
                            player.timeTimer=5
                    }
                    
                })
                
                physicsWorld.addBody(this.bodies[this.bodies.length-1])
            }
            
            verts.push(
                
                v[0][0],v[0][1],v[0][2],r,g,b,ETC,l*texRep+ETC,n[0][0],n[0][1],n[0][2],
                v[1][0],v[1][1],v[1][2],r,g,b,ETC,ETC,n[0][0],n[0][1],n[0][2],
                v[2][0],v[2][1],v[2][2],r,g,b,-w*texRep+ETC,ETC,n[0][0],n[0][1],n[0][2],
                v[3][0],v[3][1],v[3][2],r,g,b,-w*texRep+ETC,l*texRep+ETC,n[0][0],n[0][1],n[0][2],
                
                v[1][0],v[1][1],v[1][2],r,g,b,ETC,ETC,n[1][0],n[1][1],n[1][2],
                v[2][0],v[2][1],v[2][2],r,g,b,w*texRep+ETC,ETC,n[1][0],n[1][1],n[1][2],
                v[5][0],v[5][1],v[5][2],r,g,b,ETC,h*texRep+ETC,n[1][0],n[1][1],n[1][2],
                v[6][0],v[6][1],v[6][2],r,g,b,w*texRep+ETC,h*texRep+ETC,n[1][0],n[1][1],n[1][2],
                
                v[0][0],v[0][1],v[0][2],r,g,b,w*texRep+ETC,ETC,n[2][0],n[2][1],n[2][2],
                v[3][0],v[3][1],v[3][2],r,g,b,ETC,ETC,n[2][0],n[2][1],n[2][2],
                v[4][0],v[4][1],v[4][2],r,g,b,w*texRep+ETC,h*texRep+ETC,n[2][0],n[2][1],n[2][2],
                v[7][0],v[7][1],v[7][2],r,g,b,ETC,h*texRep+ETC,n[2][0],n[2][1],n[2][2],
                
                v[2][0],v[2][1],v[2][2],r,g,b,ETC,ETC,n[3][0],n[3][1],n[3][2],
                v[3][0],v[3][1],v[3][2],r,g,b,l*texRep+ETC,ETC,n[3][0],n[3][1],n[3][2],
                v[6][0],v[6][1],v[6][2],r,g,b,ETC,h*texRep+ETC,n[3][0],n[3][1],n[3][2],
                v[7][0],v[7][1],v[7][2],r,g,b,l*texRep+ETC,h*texRep+ETC,n[3][0],n[3][1],n[3][2],
                
                v[0][0],v[0][1],v[0][2],r,g,b,ETC,ETC,n[4][0],n[4][1],n[4][2],
                v[1][0],v[1][1],v[1][2],r,g,b,l*texRep+ETC,ETC,n[4][0],n[4][1],n[4][2],
                v[4][0],v[4][1],v[4][2],r,g,b,ETC,h*texRep+ETC,n[4][0],n[4][1],n[4][2],
                v[5][0],v[5][1],v[5][2],r,g,b,l*texRep+ETC,h*texRep+ETC,n[4][0],n[4][1],n[4][2],
                
                v[4][0],v[4][1],v[4][2],r,g,b,ETC,l*texRep+ETC,n[5][0],n[5][1],n[5][2],
                v[5][0],v[5][1],v[5][2],r,g,b,ETC,ETC,n[5][0],n[5][1],n[5][2],
                v[6][0],v[6][1],v[6][2],r,g,b,w*texRep+ETC,ETC,n[5][0],n[5][1],n[5][2],
                v[7][0],v[7][1],v[7][2],r,g,b,w*texRep+ETC,l*texRep+ETC,n[5][0],n[5][1],n[5][2]
                
            )
            
            index.push(
                
                vl,1+vl,2+vl,
                vl,2+vl,3+vl,
                5+vl,6+vl,7+vl,
                6+vl,5+vl,4+vl,
                8+vl,9+vl,10+vl,
                11+vl,10+vl,9+vl,
                14+vl,13+vl,12+vl,
                13+vl,14+vl,15+vl,
                18+vl,17+vl,16+vl,
                17+vl,18+vl,19+vl,
                22+vl,21+vl,20+vl,
                23+vl,22+vl,20+vl
            )
        }
        
        this.setMesh(verts,index)
        
        if(physics){
            
            for(let i in this.bodies){
                
                physicsWorld.addBody(this.bodies[i])
            }
        }
    }
    
    setMesh(verts,index){
        
        this.verts=verts||[]
        this.index=index||[]
        
        this.indexAmount=this.index.length
    }
    
    setBuffers(){
        
        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(this.verts),gl.STATIC_DRAW)
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(this.index),gl.STATIC_DRAW)
        
    }
    
    render(){
        
        gl.bindBuffer(gl.ARRAY_BUFFER,this.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer)
        
        gl.vertexAttribPointer(glCache.static_vertPos,3,gl.FLOAT,gl.FALSE,44,0)
        gl.vertexAttribPointer(glCache.static_vertColor,3,gl.FLOAT,gl.FALSE,44,12)
        gl.vertexAttribPointer(glCache.static_vertTexCoord,2,gl.FLOAT,gl.FALSE,44,24)
        gl.vertexAttribPointer(glCache.static_vertNormal,3,gl.FLOAT,gl.FALSE,44,32)
        
        gl.drawElements(gl.TRIANGLES,this.indexAmount,gl.UNSIGNED_SHORT,0)
        
    }
    
}

let physicsObjects={
    
    objects:[],constraints:[],
    
    add:function(obj){
        
        physicsObjects.objects.push(obj)
        
        return obj.body
        
    },
    
    createRagdoll:function(params){
        
        let pos=params.pos,
            scale=params.scale||1,
            angle=Math.PI*0.375,
            twistAngle=Math.PI*0.1,
            headRad=0.4*scale,
            torsoSize=[0.8*scale,1.2*scale,0.4*scale],
            head=physicsObjects.add(new PhysicsSphere({pos:pos,radius:headRad})),
            torso=physicsObjects.add(new PhysicsBox({pos:[pos[0],pos[1]-headRad-torsoSize*0.5,pos[2]],size:torsoSize})),
            neck=new CANNON.ConeTwistConstraint(head,torso,{
                
                pivotA:new CANNON.Vec3(0,-headRad-scale*0.08,0),
                pivotB:new CANNON.Vec3(0,torsoSize[1]*0.5,0),
                axisA:CANNON.Vec3.UNIT_Y,
                axisB:CANNON.Vec3.UNIT_Y,
                angle:angle,
                twistAngle:twistAngle
            }),
            armSize=[1.1*scale,0.4*scale,0.4*scale],
            leftArm=physicsObjects.add(new PhysicsBox({pos:[pos[0]-armSize[0],pos[1]-headRad-torsoSize*0.4,pos[2]],size:armSize})),
            leftShoulder=new CANNON.ConeTwistConstraint(leftArm,torso,{
                
                pivotA:new CANNON.Vec3(armSize[0]*0.2,0,0),
                pivotB:new CANNON.Vec3(-torsoSize[0],torsoSize[1]*0.5,0),
                axisA:CANNON.Vec3.UNIT_X,
                axisB:CANNON.Vec3.UNIT_X,
                angle:angle,
                twistAngle:twistAngle
                
            })
            rightArm=physicsObjects.add(new PhysicsBox({pos:[pos[0]+armSize[0],pos[1]-headRad-torsoSize*0.4,pos[2]],size:armSize})),
            rightShoulder=new CANNON.ConeTwistConstraint(rightArm,torso,{
                
                pivotA:new CANNON.Vec3(-armSize[0]*0.2,0,0),
                pivotB:new CANNON.Vec3(torsoSize[0],torsoSize[1]*0.5,0),
                axisA:CANNON.Vec3.UNIT_X,
                axisB:CANNON.Vec3.UNIT_X,
                angle:angle,
                twistAngle:twistAngle
            }),
            legSize=[armSize[1],armSize[0]*1.3,armSize[2]],
            leftLeg=physicsObjects.add(new PhysicsBox({pos:[pos[0]+legSize[0],pos[1]-headRad-torsoSize*0.4,pos[2]],size:legSize})),
            leftHip=new CANNON.ConeTwistConstraint(leftLeg,torso,{
                pivotA:new CANNON.Vec3(0,legSize[1]*0.3,0),
                pivotB:new CANNON.Vec3(-torsoSize[0]*0.4,-torsoSize[1]*0.5,0),
                axisA:CANNON.Vec3.UNIT_Y,
                axisB:CANNON.Vec3.UNIT_Y,
                angle:angle,
                twistAngle:twistAngle
            }),
            rightLeg=physicsObjects.add(new PhysicsBox({pos:[pos[0]-legSize[0],pos[1]-headRad-torsoSize*0.4,pos[2]],size:legSize})),
            rightHip=new CANNON.ConeTwistConstraint(rightLeg,torso,{
                pivotA:new CANNON.Vec3(0,legSize[1]*0.3,0),
                pivotB:new CANNON.Vec3(torsoSize[0]*0.4,-torsoSize[1]*0.5,0),
                axisA:CANNON.Vec3.UNIT_Y,
                axisB:CANNON.Vec3.UNIT_Y,
                angle:angle,
                twistAngle:twistAngle
            })
            
        let limbs=[physicsObjects.objects[physicsObjects.objects.length-1],physicsObjects.objects[physicsObjects.objects.length-2],physicsObjects.objects[physicsObjects.objects.length-3],physicsObjects.objects[physicsObjects.objects.length-4],physicsObjects.objects[physicsObjects.objects.length-5],physicsObjects.objects[physicsObjects.objects.length-6]]
        
        for(let l in limbs){
            
            limbs[l].body.limbs=limbs
        }
        
        physicsWorld.addConstraint(rightHip)
        physicsWorld.addConstraint(leftHip)
        physicsWorld.addConstraint(rightShoulder)
        physicsWorld.addConstraint(leftShoulder)
        physicsWorld.addConstraint(neck)
        
        physicsObjects.constraints.push(rightHip,leftHip,rightShoulder,leftShoulder,neck)
        
    }
}

let greyCol=[0.4,0.4,0.4,1]

class PhysicsBilly {
    
    constructor(params){
        
        this.mesh=meshes.billy1
        this.size=params.size||[1,1,1]
        
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            mass:params.mass||2,
            shape:new CANNON.Box(new CANNON.Vec3(this.size[0]*0.5,this.size[1]*0.5,this.size[2]*0.5)),
            angularDamping:0.75,
            collisionFilterGroup:DYNAMIC_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            material:billyMaterial,
            allowSleep:false
        })
        
        this.state=1
        
        let t=this
        
        this.body.addEventListener('collide',function(e){
            
            if(t.body.velocity.lengthSquared()>7 || e.body.velocity.lengthSquared()>7){
                
                t.state=0
            }
        })
        
        this.body.turnSad=function(){
            
            t.state=0
        }
        
        this.body.wakeUp=this.body.turnSad
        
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array(16)
        this.arrQuat=[]
        
        this.edgeDetectRes=new CANNON.RaycastResult()
        this.edgeDetect=new CANNON.Vec3()
    }
    
    update(){
        
        this.mesh=meshes['billy'+this.state]
        
        if(frameCount%240===0){
            
            this.state=(~~(Math.random()*2))+1
        }
        
        if(!this.state){
            
            let x=player.body.position.x-this.body.position.x,
                y=this.body.position.y-0.5,
                z=player.body.position.z-this.body.position.z,
                m=0.5/Math.sqrt(x*x+z*z),
                vx=this.body.velocity.x,
                vy=this.body.velocity.y+5,
                vz=this.body.velocity.z,
                vm=-2/Math.sqrt(vx*vx+vy*vy+vz*vz)
            
            x*=m
            z*=m
            
            if(vm){
                
                vx*=vm
                vy*=vm
                vz*=vm
                
                let lx=z,lz=-x,rx=-z,rz=x
                
                lx+=this.body.position.x
                lz+=this.body.position.z
                rx+=this.body.position.x
                rz+=this.body.position.z
                
                LineRenderer.add([lx,y,lz],[lx+vx,y+vy,lz+vz],0.3,0.3,greyCol,greyCol,1,1,'Medium')
                LineRenderer.add([rx,y,rz],[rx+vx,y+vy,rz+vz],0.3,0.3,greyCol,greyCol,1,1,'Medium')
            
            }
            
            mat4.fromRotationTranslationScale(this.matrix,[this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w],[this.body.position.x,this.body.position.y,this.body.position.z],this.size)
            
        } else {
            
            let x=player.body.position.x-this.body.position.x,
                z=player.body.position.z-this.body.position.z,
                speed=this.body.velocity.length(),
                m=Math.sqrt(x*x+z*z),
                n=1/m,
                dir=[-x*n,0,-z*n]
            
            quat.rotationTo(this.arrQuat,NEG_Z,dir)
            quat.normalize(this.arrQuat,this.arrQuat)
            
            if(speed<3 && m>7.5){
                
                this.edgeDetect.set(this.body.position.x-dir[0]*7,this.body.position.y-3,this.body.position.z-dir[2]*7)
            physicsWorld.raycastAny(this.body.position,this.edgeDetect,{collisionFilterMask:STATIC_PHYSICS_GROUP},this.edgeDetectRes)
                
                m=dt*n*0.25
                
                x*=m
                z*=m
                
                this.body.velocity.x+=x
                this.body.velocity.z+=z
                
                if(!this.edgeDetectRes.hasHit){
                    
                    this.body.velocity.x*=0.5
                    this.body.velocity.z*=0.5
                }
            }
            
            vec3.scale(dir,dir,0.5)
            
            let sin=Math.sin(TIME*0.35),yPos=this.body.position.y+Math.abs(sin*1.5),offset=1.7+((1-Math.abs(sin))*0.5),Y=Math.max(yPos-1.5,this.body.position.y-0.5),
                lx=dir[2],lz=-dir[0],rx=-dir[2],rz=dir[0],
                _lx=dir[2]*offset,_lz=-dir[0]*offset,_rx=-dir[2]*offset,_rz=dir[0]*offset,avg=(yPos+Y)*0.5
            
            lx+=this.body.position.x
            lz+=this.body.position.z
            rx+=this.body.position.x
            rz+=this.body.position.z
            _lx+=this.body.position.x
            _lz+=this.body.position.z
            _rx+=this.body.position.x
            _rz+=this.body.position.z
            
            LineRenderer.add([lx,yPos,lz],[_lx,avg,_lz],0.3,0.3,greyCol,greyCol,1,1,'Medium')
            LineRenderer.add([rx,yPos,rz],[_rx,avg,_rz],0.3,0.3,greyCol,greyCol,1,1,'Medium')
            
            LineRenderer.add([lx,Y,lz],[_lx,avg,_lz],0.3,0.3,greyCol,greyCol,1,1,'Medium')
            LineRenderer.add([rx,Y,rz],[_rx,avg,_rz],0.3,0.3,greyCol,greyCol,1,1,'Medium')
            
            mat4.fromRotationTranslationScale(this.matrix,this.arrQuat,[this.body.position.x,yPos+0.5,this.body.position.z],this.size)
        
        }
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,this.mesh.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsBox {
    
    constructor(params){
        
        this.mesh=meshes.cube
        this.size=params.size||[1,1,1]
        
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            quaternion:new CANNON.Quaternion(...quat.fromEuler([],...(params.rot||[0,0,0]))),
            mass:params.mass||2,
            shape:new CANNON.Box(new CANNON.Vec3(this.size[0]*0.5,this.size[1]*0.5,this.size[2]*0.5)),
            angularDamping:0.5,
            collisionFilterGroup:DYNAMIC_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            material:roughMaterial,
            sleepSpeedLimit:0.1,
            sleepTimeLimit:5
        })
        
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array(16)
    }
    
    update(){
        
        mat4.fromRotationTranslationScale(this.matrix,[this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w],[this.body.position.x,this.body.position.y,this.body.position.z],this.size)
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,meshes.cube.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsSphere {
    
    constructor(params){
        
        this.mesh=meshes.sphere
        this.radius=params.radius||0.5
        this.diameter=this.radius*2
        this.timer=0
        
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            mass:params.mass||2,
            shape:new CANNON.Sphere(this.radius),
            angularDamping:0.8,
            collisionFilterGroup:DYNAMIC_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            material:roughMaterial,
            sleepSpeedLimit:0.1,
            sleepTimeLimit:5
        })
        
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array([
            
            this.diameter,0,0,0,
            0,this.diameter,0,0,
            0,0,this.diameter,0,
            0,0,0,1
        ])
    }
    
    update(){
        
        if(this.timer<10){
            
            this.timer++
            this.body.velocity.setZero()
        }
        
        this.matrix[12]=this.body.position.x
        this.matrix[13]=this.body.position.y
        this.matrix[14]=this.body.position.z
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,meshes.sphere.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsBullet {
    
    constructor(params){
        
        this.enemyFrom=params.enemyFrom
        this.mesh=meshes.bullet
        this.pos=params.pos.slice()
        this.matrix=new Float32Array(16)
        let q=quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0)
        mat4.fromRotationTranslationScale(this.matrix,q,this.pos,[0.35,0.35,1.5])
        this.dir=vec3.transformQuat([],NEG_Z,q)
        this.inv_dir=vec3.inverse([],this.dir)
        this.speed=params.speed||(params.isPlayer?5:4.5)
        this.life=65
        
        let result=new CANNON.RaycastResult(),
            from=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2]),
            to=new CANNON.Vec3(from.x+this.dir[0]*10000,from.y+this.dir[1]*10000,from.z+this.dir[2]*10000)
        
        physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP},result)
        
        this.hitGlass=result.body
        
        this.maxDist=result.hasHit?result.distance:Infinity
        this.distMoved=0
        
        this.vPos=from
        this.vPPos=new CANNON.Vec3(from.x,from.y,from.z)
        this.raycastResult=new CANNON.RaycastResult()
        this.isPlayer=params.isPlayer
        
        this.trail=new Trail({
            
            len:30,
            thicknessRange:[0,0.7],
            thicknessLimit:[0,0.3],
            colorRange:[[1,0,0,0],[1,0,0,2]]
        })
    }
    
    die(index){
        
        player.addSound('Bullet hits',this.pos,false,20)
        
        for(let j=0,l=~~(Math.random()*10+5);j<l;j++){
                
            let c=MATH.random(0.1,0.6)
            
            ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-0.4,0.4),vy:MATH.random(0.2,1),vz:MATH.random(-0.4,0.4),grav:-0.175,size:MATH.random(40,90),col:[c,c,c],life:15})
            
        }
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        if(this.life<=0){
            
            return true
        }
        
        let d=dt*this.speed
        this.distMoved+=d
        
        if(this.distMoved>=this.maxDist){
            
            this.life=0
            
            if(this.hitGlass && this.hitGlass.fixedRotation){
                this.hitGlass.collisionFilterGroup=0
            }
        }
        
        this.life-=dt
        vec3.scaleAndAdd(this.pos,this.pos,this.dir,d)
        
        this.vPos.set(this.pos[0],this.pos[1],this.pos[2])
        physicsWorld.raycastAny(this.vPPos,this.vPos,this.isPlayer?{collisionFilterMask:DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP}:{collisionFilterMask:DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|PLAYER_PHYSICS_GROUP},this.raycastResult)
        
        this.vPPos.copy(this.vPos)
        
        if(this.raycastResult.hasHit){
            
            if(!this.isPlayer&&this.raycastResult.body.collisionFilterGroup===PLAYER_PHYSICS_GROUP&&!player.dead){
                
                player.dead=true
                
                if(player.currentWeapon==='reverse' && !weapons[player.currentWeapon].active){
                    
                    player.dead=false
                    weapons[player.currentWeapon].activate()
                    this.enemyFrom.gottenUnoReversed=true
                    return true
                }
            }
            
            if(this.raycastResult.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && this.raycastResult.body.angularDamping!==0.69){
                
                this.life=0
                let st=9
                this.raycastResult.body.wakeUp()
                this.raycastResult.body.applyImpulse(new CANNON.Vec3(this.dir[0]*st,this.dir[1]*st,this.dir[2]*st),this.vPos)
                
            } else if(this.distMoved>3.5){
                
                this.life=0
                this.raycastResult.body.collisionFilterGroup=0
            }
        }
        
        this.matrix[12]=this.pos[0]
        this.matrix[13]=this.pos[1]
        this.matrix[14]=this.pos[2]
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        gl.drawElements(gl.TRIANGLES,meshes.bullet.indexAmount,gl.UNSIGNED_SHORT,0)
        
        this.trail.add([...this.pos])
        this.trail.update()
    }
}

class PhysicsWeapon {
    
    constructor(params){
        
        //used for picking up stuff
        this.aWeapon=1
        
        this.type=params.type
        this.mesh=meshes[this.type]
        this.timer=params.fromPlayer?Infinity:0
        
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            quaternion:new CANNON.Quaternion(...quat.fromEuler([],...(params.rot||[0,0,0]))),
            mass:params.mass||1,
            shape:new CANNON.Box(new CANNON.Vec3(0.25,0.25,0.325)),
            angularDamping:0.5,
            collisionFilterGroup:DYNAMIC_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            velocity:params.vel?new CANNON.Vec3(params.vel[0]*5,params.vel[1]*5,params.vel[2]*5):undefined,
            material:roughMaterial,
            sleepSpeedLimit:0.025,
            sleepTimeLimit:5
            
        })
            
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array(16)
    }
    
    die(index){
        
        physicsWorld.removeBody(this.body)
        physicsObjects.objects.splice(index,1)
    }
    
    update(){
        
        if(this.splice){
            
            return true
        }
        
        if(this.timer<10){
            
            this.timer++
            this.body.velocity.setZero()
        }
        
        mat4.fromRotationTranslation(this.matrix,[this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w],[this.body.position.x,this.body.position.y,this.body.position.z])
        
        gl.bindVertexArray(meshes[this.type].VAO)
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,meshes[this.type].indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsEnemy {
    
    constructor(params){
        
        this.shootRaycast=new CANNON.RaycastResult()
        this.shootTarget=new CANNON.Vec3()
        
        this.mesh=meshes.enemy
        let _size=[1.5,3.75,1.5]
        
        this.timer=0
        this.weapon=params.weapon
        this.weaponCoolDown=Math.random()*45+35
        
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            mass:1,
            shape:new CANNON.Box(new CANNON.Vec3(_size[0]*0.5,_size[1]*0.5,_size[2]*0.5)),
            collisionFilterGroup:ENEMY_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            material:slipperyMaterial,
            allowSleep:false,
            fixedRotation:true
        })
        
        let t=this
        
        this.body.addEventListener('collide',function(e){
            
            let body=e.body
            
            if((body.collisionFilterGroup===DYNAMIC_PHYSICS_GROUP||body.collisionFilterGroup===PLAYER_PHYSICS_GROUP)&&body.velocity.lengthSquared()>=2){
                
                t.body.collisionFilterGroup=0
            }
        })
        
        this.arrQuat=[]
        this.arrPos=[]
        this.size=_size
        
        this.pos=params.pos
        
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array(16)
        
        this.arrQuat[0]=this.body.quaternion.x
        this.arrQuat[1]=this.body.quaternion.y
        this.arrQuat[2]=this.body.quaternion.z
        this.arrQuat[3]=this.body.quaternion.w
        
        this.arrPos[0]=this.body.position.x
        this.arrPos[1]=this.body.position.y-0.5
        this.arrPos[2]=this.body.position.z
        
        this.edgeDetect=new CANNON.Vec3()
        this.edgeDetectRes=new CANNON.RaycastResult()
    }
    
    die(index){
        
        if(Math.random()<0.2){
            
            player.timeTimer=5
        }
        
        physicsObjects.add(new PhysicsWeapon({pos:[this.body.position.x+this.toPlayerDir[0]*2,this.body.position.y+2,this.body.position.z+this.toPlayerDir[2]*2],type:this.weapon}))
        
        physicsObjects.createRagdoll({pos:[this.body.position.x,this.body.position.y+6,this.body.position.z]})
        
        physicsWorld.removeBody(this.body)
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        if(this.body.collisionFilterGroup===0||this.gottenUnoReversed){
            return true
        }
        
        if(this.timer<10){
            
            this.timer++
            this.body.velocity.setZero()
        }
        
        this.weaponCoolDown-=dt
        
        if(this.weaponCoolDown<=0 && !this.chasing){
            
            let _x=player.body.position.x-this.body.position.x,
                _y=player.body.position.y-this.body.position.y,
                _z=player.body.position.z-this.body.position.z
            
            if(_x*_x+_y*_y+_z*_z<40*40){
                
                this.shootTarget.set(player.body.position.x,player.body.position.y+player.height-0.5,player.body.position.z)
                physicsWorld.raycastAny(this.body.position,this.shootTarget,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP},this.shootRaycast)
                
                if(!this.shootRaycast.hasHit){
                    
                    weapons[this.weapon].shoot(this.arrPos[0],this.arrPos[1]+1,this.arrPos[2],0,0,player.body.position.x-this.arrPos[0],(player.body.position.y+player.height-1)-this.arrPos[1],player.body.position.z-this.arrPos[2],false,this)
                    
                    this.weaponCoolDown=weapons[this.weapon+'_coolDown']*(player.crouching?1.8:1.5)
                    
                } else {
                    
                    this.weaponCoolDown=weapons[this.weapon+'_coolDown']*(player.crouching?1.25:0.75)
                }
            }
        }
        
        this.body.velocity.x=0
        this.body.velocity.z=0
        
        let toPlayer=[player.body.position.x-this.arrPos[0],0,player.body.position.z-this.arrPos[2]],distTo=vec3.len(toPlayer)
        
        vec3.scale(toPlayer,toPlayer,1/distTo)
        this.toPlayerDir=toPlayer
        let r=quat.rotationTo(this.arrQuat,toPlayer,this.chasing?[Math.sin(TIME*2)*0.1,0,-1]:[0,0,-1]),speed=0.65*dt
        
        if(frameCount%5===0){
            
            this.edgeDetect.set(this.body.position.x+toPlayer[0]*3,this.body.position.y-5,this.body.position.z+toPlayer[2]*3)
            physicsWorld.raycastAny(this.body.position,this.edgeDetect,{collisionFilterMask:STATIC_PHYSICS_GROUP},this.edgeDetectRes)
            
        }
        
        if(distTo<40 && distTo>12.5 && this.edgeDetectRes.hasHit){
            this.body.position.x+=toPlayer[0]*speed
            this.body.position.z+=toPlayer[2]*speed
            this.chasing=true
            this.mesh=meshes.enemy_running
            
            player.addSound('Footsteps',this.arrPos,10,7)
            
        } else {
            
            this.chasing=false
            this.mesh=meshes.enemy
            WeaponRenderingQ.add(this.weapon,this.matrix,[0,1,-1.2])
        }
        
        this.arrQuat=r
        this.arrQuat[3]=-this.arrQuat[3]
        
        this.arrPos[0]=this.body.position.x
        this.arrPos[1]=this.body.position.y-0.6
        this.arrPos[2]=this.body.position.z
        
        mat4.fromRotationTranslation(this.matrix,this.arrQuat,this.arrPos)
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,meshes.enemy.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsBomb {
    
    constructor(params){
        
        this.mesh=meshes.bomb
        this.pos=params.pos.slice()
        this.matrix=new Float32Array(MATH.IDENTITY_MATRIX)
        this.vel=vec3.transformQuat([],params.speed?[0,0,-params.speed]:NEG_Z,quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0))
        
        this.life=50
        
        this.vPos=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2])
        this.vPPos=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2])
        this.raycastResult=new CANNON.RaycastResult()
        
        this.trail=new Trail({
            
            len:15,
            thicknessRange:[0,0.25],
            colorRange:[[1,1,1,1],[1,1,1,1]]
        })
    }
    
    die(index){
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        if(this.life<=0){
            
            return true
        }
        
        this.vel[1]-=dt*0.15
        this.life-=dt
        vec3.scaleAndAdd(this.pos,this.pos,this.vel,dt)
        
        this.vPos.set(this.pos[0],this.pos[1],this.pos[2])
        physicsWorld.raycastAny(this.vPPos,this.vPos,{collisionFilterMask:STATIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP},this.raycastResult)
        this.vPPos.copy(this.vPos)
        
        this.trail.add([this.vPos.x,this.vPos.y,this.vPos.z])
        
        this.trail.update()
        
        if(this.raycastResult.hasHit && (this.life<48.5 || this.raycastResult.body.collisionFilterGroup===STATIC_PHYSICS_GROUP)){
            if(this.raycastResult.body.fixedRotation){
                
                this.raycastResult.body.collisionFilterGroup=0
            }
            
            this.pos[0]=this.raycastResult.hitPointWorld.x
            this.pos[1]=this.raycastResult.hitPointWorld.y
            this.pos[2]=this.raycastResult.hitPointWorld.z
            
            let hn=this.raycastResult.hitNormalWorld.scale(1.5)
            
            Explosion(...this.pos,15)
            
            for(let i=0;i<25;i++){
                
                let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                    c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
                
                ParticleRenderer.add({x:this.pos[0]+hn.x,y:this.pos[1]+hn.y,z:this.pos[2]+hn.z,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(250,450),col:c,life:MATH.random(15,35)})
                
            }
            
            this.life=0
        }
        
        this.matrix[12]=this.pos[0]
        this.matrix[13]=this.pos[1]
        this.matrix[14]=this.pos[2]
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        gl.drawElements(gl.TRIANGLES,meshes.bomb.indexAmount,gl.UNSIGNED_SHORT,0)
        
        
    }
}

class PhysicsBarrel {
    
    constructor(params){
        
        this.mesh=meshes.barrel
        this.timer=0
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            mass:5,
            shape:new CANNON.Cylinder(1,1,2.5,10),
            angularDamping:0.69,
            collisionFilterGroup:DYNAMIC_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            material:roughMaterial,
            sleepSpeedLimit:0.025,
            sleepTimeLimit:5
        })
        
        this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2)
        
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array(16)
    }
    
    die(index){
        
        player.timeTimer=10
        
        let px=this.body.position.x,
            py=this.body.position.y,
            pz=this.body.position.z
        
        Explosion(px,py,pz,30)
        
        for(let i=0;i<25;i++){
            
            let _c=~~(Math.random()*7),__c=MATH.random(0.2,0.5),
                c=_c?[MATH.random(0.8,1),MATH.random(0.15,0.9),0.05]:[__c,__c,__c]
            
            ParticleRenderer.add({x:px,y:py,z:pz,vx:MATH.random(-0.4,0.4),vy:MATH.random(-0.4,0.4),vz:MATH.random(-0.4,0.4),grav:0,size:MATH.random(250,450),col:c,life:MATH.random(15,35)})
            
        }
        
        physicsObjects.objects.splice(index,1)
    
    }
    
    update(){
        
        if(this.body.collisionFilterGroup===0){
            
            return true
        }
        
        if(this.timer<10){
            
            this.timer++
            this.body.velocity.setZero()
        }
        
        mat4.fromRotationTranslation(this.matrix,[this.body.quaternion.x,this.body.quaternion.y,this.body.quaternion.z,this.body.quaternion.w],[this.body.position.x,this.body.position.y,this.body.position.z])
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,meshes.barrel.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsArrow {
    
    constructor(params){
        
        this.enemyFrom=params.enemyFrom
        this.mesh=meshes.arrow
        this.pos=params.pos.slice()
        this.matrix=new Float32Array(MATH.IDENTITY_MATRIX)
        this.vel=vec3.transformQuat([],params.speed?[0,0,-params.speed]:NEG_Z,quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0))
        
        this.life=50
        
        this.vPos=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2])
        this.vPPos=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2])
        this.raycastResult=new CANNON.RaycastResult()
        
        this.trail=new Trail({
            
            len:20,
            thicknessRange:[0,0.3],
            thicknessLimit:[0,0.25],
            colorRange:[[1,1,1,1],[1,1,1,1]]
        })
        this.isPlayer=params.isPlayer
    }
    
    die(index){
        
        player.addSound('Arrow hits',this.pos,false,20)
        
        for(let j=0,l=~~(Math.random()*10+5);j<l;j++){
                
            let c=MATH.random(0.1,0.6)
            
            ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-0.4,0.4),vy:MATH.random(0.2,1),vz:MATH.random(-0.4,0.4),grav:-0.175,size:MATH.random(20,50),col:[c,c,c],life:15})
            
        }
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        if(this.life<=0){
            
            return true
        }
        
        this.vel[1]-=dt*0.1
        this.life-=dt
        vec3.scaleAndAdd(this.pos,this.pos,this.vel,dt)
        
        this.vPos.set(this.pos[0],this.pos[1],this.pos[2])
        physicsWorld.raycastAny(this.vPPos,this.vPos,this.isPlayer?{collisionFilterMask:DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|STATIC_PHYSICS_GROUP}:{collisionFilterMask:DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP},this.raycastResult)
        
        this.vPPos.copy(this.vPos)
        
        this.trail.add([this.vPos.x,this.vPos.y,this.vPos.z])
        
        this.trail.update()
        
        if(this.raycastResult.hasHit){
            
            if(this.raycastResult.body.collisionFilterGroup===PLAYER_PHYSICS_GROUP){
                
                player.dead=true
                
                if(player.currentWeapon==='reverse' && !weapons[player.currentWeapon].active){
                    
                    player.dead=false
                    weapons[player.currentWeapon].activate()
                    this.enemyFrom.gottenUnoReversed=true
                    return true
                }
            }
            
            if(this.raycastResult.body.collisionFilterGroup===STATIC_PHYSICS_GROUP && this.raycastResult.body.fixedRotation){
                
                this.raycastResult.body.collisionFilterGroup=0
            }
            
            if(this.raycastResult.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP){
                
                this.life=0
                let st=2
                this.raycastResult.body.wakeUp()
                this.raycastResult.body.applyImpulse(new CANNON.Vec3(this.vel[0]*st,this.vel[1]*st,this.vel[2]*st),this.vPos)
                
            } else if(this.life<47.5||this.isPlayer){
                
                this.life=0
                this.raycastResult.body.collisionFilterGroup=0
            }
        }
        
        this.matrix[12]=this.pos[0]
        this.matrix[13]=this.pos[1]
        this.matrix[14]=this.pos[2]
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        gl.drawElements(gl.TRIANGLES,meshes.bomb.indexAmount,gl.UNSIGNED_SHORT,0)
        
        
    }
}

class PhysicsRail {
    
    constructor(params){
        
        this.render=params.render===undefined?true:params.render
        //empty mesh
        this.mesh=meshes.hand
        this.yaw=params.yaw
        this.pitch=params.pitch
        this.thickness=0.1
        this.pos=params.pos.slice()
        let q=quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0)
        this.dir=vec3.transformQuat([],NEG_Z,q)
        this.life=7.5
        
        let result=new CANNON.RaycastResult(),
            from=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2]),
            to=new CANNON.Vec3(from.x+this.dir[0]*10000,from.y+this.dir[1]*10000,from.z+this.dir[2]*10000)
        
        this.distanceTillHit=10000
        this.vPos=[from.x,from.y,from.z]
        
        physicsWorld.raycastClosest(from,to,params.isPlayer?{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP}:{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|PLAYER_PHYSICS_GROUP},result)
        
        if(result.hasHit && result.distance>(result.body.collisionFilterGroup===ENEMY_PHYSICS_GROUP?3:0)){
            
            this.distanceTillHit=result.distance
            
            if(result.body.collisionFilterGroup===PLAYER_PHYSICS_GROUP){
                player.dead=true
                
                if(player.currentWeapon==='reverse' && !weapons[player.currentWeapon].active){
                    
                    player.dead=false
                    weapons[player.currentWeapon].activate()
                    params.enemyFrom.gottenUnoReversed=true
                    
                }
                
            }
            this.pos=[result.hitPointWorld.x,result.hitPointWorld.y,result.hitPointWorld.z]
            
            if(result.body.collisionFilterGroup===STATIC_PHYSICS_GROUP && result.body.fixedRotation){
                
                result.body.collisionFilterGroup=0
            }
            
            if(result.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && result.body.angularDamping!==0.69){
                
                let st=25
                result.body.wakeUp()
                result.body.applyImpulse(new CANNON.Vec3(this.dir[0]*st,this.dir[1]*st,this.dir[2]*st),from)
                
            } else {
                
                result.body.collisionFilterGroup=0
                
                if(this.render){
                    
                    physicsObjects.add(new PhysicsRail({
                        
                        pos:this.pos,
                        yaw:params.yaw,
                        pitch:params.pitch,
                        isPlayer:this.isPlayer,
                        enemyFrom:params.enemyFrom
                        
                    }))
                }
            }
            
        } else {this.pos=[to.x,to.y,to.z]}
        
    }
    
    die(index){
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        if(this.render){
            
            LineRenderer.add(this.vPos,this.pos,0.1,0.1,[1,1,1,this.distanceTillHit*5*this.thickness],[1,1,1,0])
            
        } else {
            
            let t=Math.max(this.thickness*this.thickness,0)
            LineRenderer.add(this.vPos,this.pos,t,t,[1,1,0,1],[1,1,0,1])
        }
        
        if(this.life>0){
            
            this.life-=dt
            return
        }
        
        this.thickness-=dt*0.01
        
        return this.thickness<=0
    }
}

class PhysicsLantern {
    
    constructor(params){
        
        this.mesh=meshes.lanternBomb
        this.pos=params.pos.slice()
        this.matrix=new Float32Array(MATH.IDENTITY_MATRIX)
        this.vel=vec3.transformQuat([],params.speed?[0,0,-params.speed]:NEG_Z,quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0))
        
        this.life=50
        
        this.vPos=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2])
        this.vPPos=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2])
        this.raycastResult=new CANNON.RaycastResult()
        this.fireTimer=0
        
        this.trail=new Trail({
            
            len:25,
            thicknessRange:[0,0.25],
            colorRange:[[1,0.5,0,0],[1,0.5,0,3]]
        })
    }
    
    die(index){
        
        player.addSound('Lantern burns',this.pos,false,20)
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        if(this.activeFire){
            
            this.fireTimer++
            
            if(frameCount%4===0){
                
                ParticleRenderer.add({x:this.pos[0]+MATH.random(-0.5,0.5),y:this.pos[1]+MATH.random(-0.1,0.1),z:this.pos[2]+MATH.random(-0.5,0.5),vx:MATH.random(-0.15,0.15),vy:0,vz:MATH.random(-0.15,0.15),grav:0.025,size:MATH.random(100,150),life:MATH.random(30,60),col:[MATH.random(0.8,1),Math.random(),0]})
                
            }
            
            if(this.fireTimer>200){return true}
            
        } else {
            
            if(this.life<=0){
                
                this.activeFire=true
            }
            
            this.vel[1]-=dt*0.15
            this.life-=dt
            vec3.scaleAndAdd(this.pos,this.pos,this.vel,dt)
            
            this.vPos.set(this.pos[0],this.pos[1],this.pos[2])
            physicsWorld.raycastClosest(this.vPPos,this.vPos,{collisionFilterMask:STATIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP},this.raycastResult)
            this.vPPos.copy(this.vPos)
            
            if(this.raycastResult.hasHit && (this.life<48.5 || this.raycastResult.body.collisionFilterGroup===STATIC_PHYSICS_GROUP)){
                if(this.raycastResult.body.fixedRotation){
                    
                    this.raycastResult.body.collisionFilterGroup=0
                }
                this.pos[0]=this.raycastResult.hitPointWorld.x
                this.pos[1]=this.raycastResult.hitPointWorld.y
                this.pos[2]=this.raycastResult.hitPointWorld.z
                Explosion(...this.pos,5)
                this.life=0
            }
            
            ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-0.075,0.075),vy:MATH.random(-0.075,0.075),vz:MATH.random(-0.075,0.075),grav:0.03,life:35,col:[1,0.15,0.08],size:MATH.random(10,30)})
            
            this.matrix[12]=this.pos[0]
            this.matrix[13]=this.pos[1]
            this.matrix[14]=this.pos[2]
            
            gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
            gl.drawElements(gl.TRIANGLES,meshes.lanternBomb.indexAmount,gl.UNSIGNED_SHORT,0)
        }
        
        this.trail.add([...this.pos])
        this.trail.update()
        
    }
}

class PhysicsBeam {
    
    constructor(params){
        
        this.render=params.render===undefined?true:params.render
        //empty mesh
        this.mesh=meshes.hand
        this.yaw=params.yaw
        this.pitch=params.pitch
        this.pos=params.pos.slice()
        let q=quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0)
        this.dir=vec3.transformQuat([],NEG_Z,q)
        this.life=20
        
        let result=new CANNON.RaycastResult(),
            from=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2]),
            to=new CANNON.Vec3(from.x+this.dir[0]*100,from.y+this.dir[1]*100,from.z+this.dir[2]*100)
        
        this.vPos=[from.x,from.y,from.z]
        
        physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP},result)
        
        if(result.hasHit && result.distance>(result.body.collisionFilterGroup===ENEMY_PHYSICS_GROUP?3:0)){
            
            this.dist=result.distance
            
            this.pos=[result.hitPointWorld.x,result.hitPointWorld.y,result.hitPointWorld.z]
            
            if(result.body.collisionFilterGroup===STATIC_PHYSICS_GROUP && result.body.fixedRotation){
                
                result.body.collisionFilterGroup=0
            }
            
            if(result.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && result.body.angularDamping!==0.69){
                
                let st=25
                result.body.wakeUp()
                result.body.applyImpulse(new CANNON.Vec3(this.dir[0]*st,this.dir[1]*st,this.dir[2]*st),from)
                
            } else {
                
                if(result.body.collisionFilterGroup===ENEMY_PHYSICS_GROUP){
                    for(let i in physicsObjects.objects){
                        
                        if(physicsObjects.objects[i].body && physicsObjects.objects[i].body===result.body){
                            
                            let x=physicsObjects.objects[i].body.position.x,y=physicsObjects.objects[i].body.position.y,z=physicsObjects.objects[i].body.position.z
                            
                            for(let j=0;j<100;j++){
                                
                                ParticleRenderer.add({
                                    
                                    x:x+MATH.random(-2,2),y:y,z:z+MATH.random(-2,2),vx:0,vy:MATH.random(-0.2,0.2),vz:0,size:MATH.random(30,140),life:MATH.random(30,70),col:MATH.HSBToRGB(Math.random()*255,255,100),grav:0 
                                })
                            }
                            
                            physicsWorld.removeBody(physicsObjects.objects[i].body)
                            physicsObjects.objects.splice(i,1)
                            break
                        }
                    }
                    
                } else {
                    
                    result.body.collisionFilterGroup=0
                }
            }
            
        } else {this.pos=[to.x,to.y,to.z];this.dist=100}
        
        let midPoint=vec3.lerp([],this.vPos,this.pos,0.5),r=40
        
        for(let i=0;i<3;i++){
            
            let cp1=vec3.add([],midPoint,[MATH.random(-r,r),MATH.random(-r,r),MATH.random(-r,r)]),
                cp2=vec3.add([],midPoint,[MATH.random(-r,r),MATH.random(-r,r),MATH.random(-r,r)])
            
            this['bezier'+i]=[this.vPos,cp1,cp2,this.pos]
        }
        
    }
    
    die(index){
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        for(let i=3;i--;){
            
            let r=Math.random(),p=MATH.generateBezierCurve(...this['bezier'+~~(frameCount%3)],r)
            
            ParticleRenderer.add({
                
                x:p[0],y:p[1],z:p[2],vx:MATH.random(-0.025,0.025),vy:MATH.random(-0.025,0.025),vz:MATH.random(-0.025,0.025),size:MATH.random(30,90),life:MATH.random(20,40),col:MATH.HSBToRGB((r*10*this.dist)%255,255,255),grav:0
                
            })
            
        }
        
        this.life-=dt
        
        return this.life<=0
    }
}

class PhysicsGlass {
    
    constructor(data){
        
        this.mesh=new Mesh()
        
        let d=data
        
        d.col=[0,0.5,1]
        
        this.mesh.makeMesh([d],false)
        this.mesh.setBuffers()
        this.body=new CANNON.Body({
            
            mass:0,
            fixedRotation:true,
            shape:new CANNON.Box(new CANNON.Vec3(data.size[0]*0.5,data.size[1]*0.5,data.size[2]*0.5)),
            position:new CANNON.Vec3(...data.pos),
            quaternion:new CANNON.Quaternion(...quat.fromEuler([],data.rot[0],data.rot[1],data.rot[2])),
            collisionFilterGroup:STATIC_PHYSICS_GROUP,
            collisionFilterMask:DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP|PLAYER_PHYSICS_GROUP,
            material:roughMaterial
        })
        
        let b=this.body
        
        this.body.addEventListener('collide',function(e){
            
            if(e.body.velocity.lengthSquared()<10){return}
            
            b.collisionFilterGroup=0
            player.addSound('Glass shatters',[b.position.x,0,b.position.z],false,20)
            
        })
        
        physicsWorld.addBody(this.body)
        
    }
    
    die(index,level){
        
        let chance=Math.random()
        player.timeTimer=10
        
        if(chance<0.375){
            
            for(let i=0;i<2;i++){
                
                physicsObjects.add(new PhysicsWeapon({pos:[this.body.position.x+MATH.random(-1,1),this.body.position.y+MATH.random(-1,1),this.body.position.z+MATH.random(-1,1)],type:'shard',vel:[MATH.random(-0.4,0.4),MATH.random(-0.4,0.4),MATH.random(-0.4,0.4)],fromPlayer:true}))
            
            }
            
        } else if(chance<0.75){
            
            physicsObjects.add(new PhysicsWeapon({pos:[this.body.position.x+MATH.random(-1,1),this.body.position.y+MATH.random(-1,1),this.body.position.z+MATH.random(-1,1)],type:'shard',vel:[MATH.random(-0.4,0.4),MATH.random(-0.4,0.4),MATH.random(-0.4,0.4)],fromPlayer:true}))
        }
        
        for(let j=0;j<30;j++){
            
            let x=this.body.position.x,
                y=this.body.position.y,
                z=this.body.position.z
                
            ParticleRenderer.add({x:x,y:y,z:z,vx:MATH.random(-0.5,0.5),vy:MATH.random(-0.1,0.6),vz:MATH.random(-0.5,0.5),grav:-0.1,size:MATH.random(100,250),col:[0.15,0.4,0.9],life:MATH.random(35,55)})
        }
        
        physicsWorld.removeBody(this.body)
        
        levels[level].updatedBodies.splice(index,1)
    }
    
    update(){
        
        this.mesh.render()
        
        return this.body.collisionFilterGroup===0
    }
    
}

class PhysicsLava {
    
    constructor(data){
        
        this.mesh=new Mesh()
        
        let d=data
        
        d.col=[2,0,0]
        
        this.mesh.makeMesh([d],false)
        this.mesh.setBuffers()
        this.size=data.size.slice()
        this.body=new CANNON.Body({
            
            mass:0,
            shape:new CANNON.Box(new CANNON.Vec3(data.size[0]*0.5,data.size[1]*0.5,data.size[2]*0.5)),
            position:new CANNON.Vec3(...data.pos),
            quaternion:new CANNON.Quaternion(...quat.fromEuler([],data.rot[0],data.rot[1],data.rot[2])),
            collisionFilterGroup:LAVA_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP,
        })
        
        let b=this.body
        
        this.body.addEventListener('collide',function(e){
            
            player.dead=true
            b.collisionFilterMask=0
            
        })
        
        physicsWorld.addBody(this.body)
        
        vec3.scale(this.size,this.size,0.5)
    }
    
    die(index,level){
        
        physicsWorld.removeBody(this.body)
        
        levels[level].updatedBodies.splice(index,1)
    }
    
    update(){
        
        let x=this.body.position.x,
                y=this.body.position.y,
                z=this.body.position.z
        
        if(!(~~(Math.random()*6))){
            
            ParticleRenderer.add({x:x+MATH.random(-this.size[0],this.size[0]),y:y+this.size[1],z:z+MATH.random(-this.size[2],this.size[2]),vx:0,vy:MATH.random(0.05,0.175),vz:0,grav:0,size:MATH.random(10,70),col:[MATH.random(0.7,1),0,0],life:MATH.random(15,30)})
        }
        
        player.addSound('Lava pops',[x,y,z],200,12)
        
        this.mesh.render()
        return this.body.collisionFilterGroup===0
    }
}

class ParticleSystem {
    
    constructor(params){
        
        this.pos=params.pos
        this.size=params.size
        
        this.productionRate=params.productionRate
        this.batchAmount=params.batchAmount
        
        this.minVelX=params.minVelX
        this.maxVelX=params.maxVelX
        this.minVelY=params.minVelY
        this.maxVelY=params.maxVelY
        this.minVelZ=params.minVelZ
        this.maxVelZ=params.maxVelZ
        
        this.grav=params.grav
        
        this.minSize=params.minSize
        this.maxSize=params.maxSize
        
        this.minR=params.minR
        this.maxR=params.maxR
        this.minG=params.minG
        this.maxG=params.maxG
        this.minB=params.minB
        this.maxB=params.maxB
        
        this.minLife=params.minLife
        this.maxLife=params.maxLife
    }
    
    update(){
        
        if(frameCount%this.productionRate===0){
            
            for(let i=0;i<this.batchAmount;i++){
                    
                ParticleRenderer.add({x:MATH.random(this.pos[0]-this.size[0]*0.5,this.pos[0]+this.size[0]*0.5),y:MATH.random(this.pos[1]-this.size[1]*0.5,this.pos[1]+this.size[1]*0.5),z:MATH.random(this.pos[2]-this.size[2]*0.5,this.pos[2]+this.size[2]*0.5),vx:MATH.random(this.minVelX,this.maxVelX),vy:MATH.random(this.minVelY,this.maxVelY),vz:MATH.random(this.minVelZ,this.maxVelZ),grav:this.grav,size:MATH.random(this.minSize,this.maxSize),col:[MATH.random(this.minR,this.maxR),MATH.random(this.minG,this.maxG),MATH.random(this.minB,this.maxB)],life:MATH.random(this.minLife,this.maxLife)})
            }
        }
    }
}

class PhysicsBanana {
    
    constructor(params){
        
        this.parentWeapon=params.setFlyingStatus
        this.mesh=meshes.banana
        this.pos=params.pos.slice()
        this.matrix=new Float32Array(16)
        this.distMoved=0
        let q=quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0)
        mat4.fromRotationTranslationScale(this.matrix,quat.rotateZ([],q,Math.PI*0.5),this.pos,[2,2,2])
        this.dir=vec3.transformQuat([],NEG_Z,q)
        this.speed=params.speed||5
        
        let result=new CANNON.RaycastResult(),
            from=new CANNON.Vec3(this.pos[0],this.pos[1],this.pos[2]),
            to=new CANNON.Vec3(from.x+this.dir[0]*10000,from.y+this.dir[1]*10000,from.z+this.dir[2]*10000)
        
        physicsWorld.raycastClosest(from,to,{collisionFilterMask:STATIC_PHYSICS_GROUP},result)
        
        this.hitGlass=result.body
        
        this.maxDist=result.hasHit?result.distance:30
        
        this.vPos=from
        this.vPPos=new CANNON.Vec3(from.x,from.y,from.z)
        this.raycastResult=new CANNON.RaycastResult()
        this.isPlayer=params.isPlayer
        
    }
    
    die(index){
        
        this.parentWeapon.flying=false
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        player.addSound('Banana zooms',false,70,10)
        
        if(!this.flyBack){
            
            this.parentWeapon.flying=true
            
            let d=dt*this.speed
            this.distMoved+=d
            
            if(this.distMoved>=this.maxDist){
                
                player.addSound('Banana bounces',this.pos,false,20)
                
                this.flyBack=true
                
                if(this.hitGlass && this.hitGlass.fixedRotation){
                    this.hitGlass.collisionFilterGroup=0
                }
            }
            
            vec3.scaleAndAdd(this.pos,this.pos,this.dir,d)
            
            this.vPos.set(this.pos[0],this.pos[1],this.pos[2])
            physicsWorld.raycastAny(this.vPPos,this.vPos,{collisionFilterMask:DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP},this.raycastResult)
            
            this.vPPos.copy(this.vPos)
            
            if(this.raycastResult.hasHit){
                
                this.flyBack=true
                
                if(this.raycastResult.body.collisionFilterGroup!==ENEMY_PHYSICS_GROUP && this.raycastResult.body.angularDamping!==0.69){
                    let st=9
                    this.raycastResult.body.wakeUp()
                    this.raycastResult.body.applyImpulse(new CANNON.Vec3(this.dir[0]*st,this.dir[1]*st,this.dir[2]*st),this.vPos)
                    
                } else if(this.distMoved>3.5){
                    
                    this.raycastResult.body.collisionFilterGroup=0
                }
            }
            
            if(this.flyBack){
                
                for(let j=0;j<15;j++){
                        
                    let c=MATH.random(0.1,0.6)
                    
                    ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-0.1,0.1),vy:MATH.random(-0.1,0.1),vz:MATH.random(-0.1,0.1),grav:0,size:MATH.random(40,90),col:[1,1,0.5],life:15})
                    
                }
            }
            
        } else {
            
            let dx=player.body.position.x-this.pos[0],
                dy=player.body.position.y-this.pos[1],
                dz=player.body.position.z-this.pos[2],
                d=this.speed*dt/Math.sqrt(dx*dx+dy*dy+dz*dz)
            
            this.pos[0]+=dx*d
            this.pos[1]+=dy*d
            this.pos[2]+=dz*d
            
            if(Math.abs(dx)+Math.abs(dy)+Math.abs(dz)<2){
                
                return true
            }
        }
        
        this.matrix[12]=this.pos[0]
        this.matrix[13]=this.pos[1]
        this.matrix[14]=this.pos[2]
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,mat4.rotateX([],this.matrix,TIME*5))
        gl.drawElements(gl.TRIANGLES,meshes.banana.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

class PhysicsBouncyBall {
    
    constructor(params){
        
        this.mesh=meshes.ball
        this.radius=params.radius||0.5
        this.diameter=this.radius*2
        this.timer=30
        let q=quat.fromEuler([],params.pitch*MATH.TO_DEG,params.yaw*MATH.TO_DEG,0)
        this.vel=vec3.transformQuat([],NEG_Z,q)
        this.vel=vec3.scale(this.vel,this.vel,params.speed)
        
        this.body=new CANNON.Body({
            
            position:new CANNON.Vec3(params.pos[0],params.pos[1],params.pos[2]),
            velocity:new CANNON.Vec3(...this.vel),
            mass:params.mass||1,
            shape:new CANNON.Sphere(this.radius),
            angularDamping:0,
            collisionFilterGroup:DYNAMIC_PHYSICS_GROUP,
            collisionFilterMask:PLAYER_PHYSICS_GROUP|STATIC_PHYSICS_GROUP|DYNAMIC_PHYSICS_GROUP|ENEMY_PHYSICS_GROUP,
            material:bouncyMaterial,
            sleepSpeedLimit:0.025,
            sleepTimeLimit:5
        })
        
        let p=this.body.position
        
        this.body.addEventListener('collide',function(){
            
            player.addSound('Bouncy ball ricochets',[p.x,p.y,p.z],false,10)
            
        })
        
        physicsWorld.addBody(this.body)
        
        this.matrix=new Float32Array([
            
            this.diameter,0,0,0,
            0,this.diameter,0,0,
            0,0,this.diameter,0,
            0,0,0,1
        ])
        
        this.trail=new Trail({
            
            len:20,
            thicknessRange:[0,1],
            colorRange:[[1,1,0,0.5],[1,1,0,0.5]],
            height:0.001,
            detail:'Low'
        })
    }
    
    die(index){
        
        physicsWorld.removeBody(this.body)
        
        physicsObjects.objects.splice(index,1)
    }
    
    update(dt){
        
        this.timer-=dt
        
        if(this.timer<0){
            
            return true
        }
        
        this.matrix[12]=this.body.position.x
        this.matrix[13]=this.body.position.y
        this.matrix[14]=this.body.position.z
        
        this.trail.add([this.body.position.x,this.body.position.y,this.body.position.z])
        
        this.trail.update()
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,this.matrix)
        
        gl.drawElements(gl.TRIANGLES,meshes.ball.indexAmount,gl.UNSIGNED_SHORT,0)
    }
}

function Explosion(x,y,z,st){
    
    player.addSound('Explosion',[x,y,z],false,30)
    
    ParticleRenderer.explosionQ.push({x:x,y:y,z:z,st:st})
    
    let b=player.body.position,
        _x=b.x-x,
        _y=b.y-y,
        _z=b.z-z,
        f=st*0.5/Math.sqrt(_x*_x+_y*_y+_z*_z),
        v=player.body.velocity
        
        f=f||0
        f=Math.min(f,st*0.8)
    player.body.velocity.set(_x*f+v.x,MATH.constrain(_y*f+v.y,-5,5),_z*f+v.z)
    
    for(let i in physicsObjects.objects){
        
        if(physicsObjects.objects[i].body){
            
            let b=physicsObjects.objects[i].body.position,
                _x=b.x-x,
                _y=b.y-y,
                _z=b.z-z,
                d=_x*_x+_y*_y+_z*_z,
                _st=st/d
            
            physicsObjects.objects[i].body.velocity.set(_x*_st,_y*_st,_z*_st)
            
            if(d<(st*st)*0.4 && (physicsObjects.objects[i] instanceof PhysicsEnemy || physicsObjects.objects[i].body.angularDamping===0.69)){
                
                physicsObjects.objects[i].body.collisionFilterGroup=0
            }
            
            if(physicsObjects.objects[i].body.angularDamping===0.75&&d<(st*st)*1.3){
                
                physicsObjects.objects[i].body.turnSad()
            }
        }
    }
}

gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)

let dt=0,TIME=0

ctx.fillStyle='rgb(0,0,0)'

let ParticleRenderer=(function(out){
    
    out.explosionQ=[]
    out.particles=[]
    out.vertBuffer=gl.createBuffer()
    out.verts=[]
    
    out.add=function(params){
        
        params.rot=Math.random()*MATH.TWO_PI
        params.rotVel=MATH.random(-1,1)
        out.particles.push(params)
    }
    
    out.render=function(dt){
        
        if(!out.particles.length) return
        
        out.verts=[]
        
        for(let i=out.particles.length;i--;){
            
            let d=out.particles[i]
            d.vy+=d.grav*dt
            d.x+=d.vx*dt
            d.y+=d.vy*dt
            d.z+=d.vz*dt
            d.rot+=d.rotVel*dt
            
            if(out.explosionQ[0]){
                
                let dx=d.x-out.explosionQ[0].x,
                    dy=d.y-out.explosionQ[0].y,
                    dz=d.z-out.explosionQ[0].z,
                    s=out.explosionQ[0].st*0.0025
                
                d.vx+=s/dx
                d.vy+=s/dy
                d.vz+=s/dz
            }
            
            d.life-=dt
            
            out.verts.push(d.x,d.y,d.z,d.col[0],d.col[1],d.col[2],d.size,d.rot)
            
            if(d.life<=0){
                
                out.particles.splice(i,1)
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,out.vertBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(out.verts),gl.STREAM_DRAW)
        gl.vertexAttribPointer(glCache.particle_vertPos,3,gl.FLOAT,gl.FALSE,32,0)
        gl.vertexAttribPointer(glCache.particle_vertColor,3,gl.FLOAT,gl.FALSE,32,12)
        gl.vertexAttribPointer(glCache.particle_vertSize,1,gl.FLOAT,gl.FALSE,32,24)
        gl.vertexAttribPointer(glCache.particle_vertRot,1,gl.FLOAT,gl.FALSE,32,28)
        gl.drawArrays(gl.POINTS,0,out.verts.length/8)
        
        if(out.explosionQ[0]){out.explosionQ.shift()}
    }
    
    return out
    
})({})

let p_update=1/60


let levels=[
    
    // this is the og level but in actual level data not the compressed code
    //if you umcomment all of this then it will still work,but the level is now level 1
    
    //memories...
    // {
    //     lightPos:[0,8,0],
    //     spawnPos:[0,1,20],
    //     milk:[0,0,12.5],
    //     data:[
            
    //         {pos:[3,0,0],rot:[0,45,0],size:[2,2,2],col:[0.03,0.9,0.3],useTex:false},
    //         {pos:[0,-2,0],rot:[0,0,0],size:[5000,2,5000],col:[0.3,0.3,0.9]},
    //         {pos:[-10,2,0],rot:[0,0,0],size:[0.75,8,0.75],col:[1,0.5,0]},
    //         {pos:[-6,2,0],rot:[0,0,0],size:[0.75,8,0.75],col:[1,0.5,0]},
    //         {pos:[-8,6.3,0],rot:[0,0,0],size:[4.75,0.75,0.75],col:[1,0.5,0]},
    //         {pos:[-6,13,-10],rot:[0,45,0],size:[2,2,2],col:[0.03,0.9,0.3]},
    //         {pos:[5,16,-9],rot:[0,45,0],size:[2,2,2],col:[0.03,0.9,0.3]},
    //         {pos:[6,0,-6],rot:[0,0,0],size:[3,8,3],col:[1.5,0.1,0.1]},
    //         {pos:[-15,0,3],rot:[0,0,0],size:[2,20,20],col:[1,1,0]},
            
    //     ],
        
    //     glass:[
            
    //         {pos:[3,2,0],rot:[0,45,0],size:[2,2,2],col:[0.15,0.4,1],useTex:false},
    //         {pos:[6,2,4],rot:[0,0,0],size:[2,6,9],col:[0.15,0.4,1],useTex:false},
            
    //     ],
        
    //     lava:[
            
    //         {pos:[-17,2,0],rot:[0,45,0],size:[2,2,2],col:[2,0,0],useTex:false},
            
    //     ],
        
    //     init:[
            
    //         PhysicsBox,{pos:[-2,5,0],size:[1,1,1]},
    //         PhysicsSphere,{pos:[0,5,0],radius:0.5},
    //         PhysicsWeapon,{pos:[0,5,0],type:'gun'},
    //         PhysicsWeapon,{pos:[0.1,7,0],type:'grapplingHook'},
    //         PhysicsEnemy,{pos:[-1,2,-4],weapon:'gun'},
    //         PhysicsEnemy,{pos:[7,2,4],weapon:'shotgun'},
    //         PhysicsEnemy,{pos:[-8,2,0],weapon:'boomer'},
    //         PhysicsEnemy,{pos:[6,7,-6],weapon:'bow'},
    //         PhysicsEnemy,{pos:[-10,2,5],weapon:'railgun'},
    //         PhysicsBarrel,{pos:[9,3,0]}
    //     ],
    // },
    "[{'pos':[0,-4,12.899999999999993],'size':[14,2,20],'rot':[0,0,0],'col':[0.34000000000000297,0.35000000000000564,0.33250000000000357],'useTex':true},{'pos':[0,-4,-13.149999999999988],'rot':[0,0,0],'size':[14,2,20],'col':[0.3400000000000061,0.35000000000000964,0.3325000000000067],'useTex':true},{'pos':[-12.49999999999999,-1.7499999999999987,-54.25000000000022],'rot':[0,0,0],'size':[7,2,7],'col':[0.34000000000000563,0.3500000000000092,0.33250000000000624],'useTex':true},{'pos':[-12.003935111172234,3.500001585340832,-54.28441783519552],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000086],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-12.003935111172234,3.500001585340832,-54.28441783519552],'weapon':'gun'}},{'pos':[0,-2.6154863647023037,-12.535201277618878],'rot':[0,0,0],'size':[2,1.3000000000000023,2],'col':[0.08543581951354162,0.4300000000000006,0.08999999999999964],'useTex':false},{'pos':[0.0149478390208801,-0.9699984146591669,-12.46504551675255],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[0.0149478390208801,-0.9699984146591669,-12.46504551675255],'rot':[0,0,0]}},{'pos':[-3.500000000000001,-0.549999999999999,-16.799999999999976],'rot':[0,23,0],'size':[6.849999999999996,6,1],'col':[1.0000000000000024,0.05000000000000582,0.04250000000000287],'useTex':true},{'pos':[15.250000000000043,-3.900000000000005,-29.499999999999897],'rot':[0,28,0],'size':[15.999999999999975,2,7],'col':[0.34000000000000563,0.3500000000000092,0.33250000000000624],'useTex':true},{'pos':[33.60000000000001,-3.900000000000005,-21.899999999999924],'rot':[0,151,0],'size':[15.999999999999975,2,7],'col':[0.3400000000000065,0.3500000000000101,0.3325000000000071],'useTex':true},{'pos':[45.55000000000011,-4,-1.1500000000000024],'rot':[0,0,0],'size':[14,2,20],'col':[0.34000000000000696,0.3500000000000105,0.33250000000000757],'useTex':true},{'pos':[45.155991516411284,-0.9099984146591575,-4.5931138215599745],'rot':[104,36,48],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'useTex':false,'partInfo':{'instance':'box','pos':[45.155991516411284,-0.9099984146591575,-4.5931138215599745],'mass':1,'rot':[104,36,48],'size':[1,1,1]}},{'pos':[42.79866246868747,-0.9099984146591575,-4.031420167725885],'rot':[64,32,108],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[42.79866246868747,-0.9099984146591575,-4.031420167725885],'mass':1,'rot':[64,32,108],'size':[1,1,1]}},{'pos':[44.18058687802549,0.7500015853408426,-2.630995260394568],'size':[0.5,0.5,0.5],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[44.18058687802549,0.7500015853408426,-2.630995260394568],'mass':1,'radius':0.5}},{'pos':[45.55000000000011,-2.5124999999999975,16.2499999999999],'rot':[0,0,0],'size':[14,5.050000000000004,14.999999999999979],'col':[0.34000000000000963,0.3500000000000132,0.33250000000001023],'useTex':true}]#[0,8,0]#[0,0,20]#[45.650000000000034,1.5500000000000103,21.750000000000014]#[0,-2,10]",
    "[{'pos':[0,-4,12.399999999999995],'size':[25.99999999999998,2,20],'rot':[0,0,0],'col':[0.3300000000000063,0.32000000000000917,0.3400000000000061]},{'pos':[-4.049999999999988,3.5124999999999345,7.187500000000003],'rot':[0,0,0],'size':[2,22.74999999999995,9],'col':[0.3300000000000134,0.3200000000000154,0.3400000000000123]},{'pos':[-4,14.749999999999995,7.25],'rot':[0,0,0],'size':[2,1,9],'col':[0.33000000000001295,0.32000000000001494,0.34000000000001185]},{'pos':[-16.812499999999996,14.762499999999966,7.25],'rot':[0,0,0],'size':[24,1,9],'col':[0.33000000000001206,0.32000000000001405,0.34000000000001096]},{'pos':[-9.070345981294727,16.690083993275632,6.724639827635527],'rot':[56,4,24],'size':[1,1,1],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000141],'useTex':false,'partInfo':{'instance':'box','pos':[-9.070345981294727,16.690083993275632,6.724639827635527],'mass':1,'rot':[56,4,24],'size':[1,1,1]}},{'pos':[-17.728295923477347,17.880001585340825,7.267308779835103],'size':[1,6.150000000000002,9.000000000000016],'col':[0.1499999999999999,0.4000000000000057,1.0000000000000133],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-26.44243950323592,17.84000158534082,6.72206975589174],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000141],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-26.44243950323592,17.84000158534082,6.72206975589174],'weapon':'gun'}},{'pos':[-40.16250000000019,14.762499999999966,7.262500000000004],'rot':[0,0,0],'size':[10,1,9],'col':[0.33000000000001206,0.32000000000001405,0.34000000000001096]},{'pos':[-22.749999999999947,19.149999999999935,2.637500000000018],'rot':[0,90,0],'size':[0.39999999999999997,8.200000000000003,9],'col':[0.33000000000001206,0.32000000000001405,0.34000000000001096]},{'pos':[-22.749999999999947,19.149999999999935,11.737499999999999],'rot':[0,90,0],'size':[0.39999999999999997,8.200000000000003,9],'col':[0.33000000000001295,0.32000000000001494,0.34000000000001185]},{'pos':[3.8000000000000007,10.099999999999946,7.237499999999976],'rot':[0,0,0],'size':[2,28.499999999999932,9],'col':[0.33000000000001517,0.32000000000001716,0.34000000000001407]}]#[0,8,0]#[0,0,20]#[-41.20000000000015,16.299999999999944,7.400000000000002]#[-9,-2,7]",
    "[{'pos':[0,-4,-13.549999999999986],'size':[8,2,75],'rot':[0,0,0],'col':[0.3100000000000036,0.33000000000000584,0.3500000000000074]},{'pos':[-4.500000000000001,-3,-13.549999999999986],'rot':[0,0,0],'size':[1,4,75],'col':[1.0000000000000107,0.13000000000000284,0.1300000000000046]},{'pos':[-9,-4,-13.549999999999986],'rot':[0,0,0],'size':[8,2,75],'col':[0.3100000000000027,0.33000000000000496,0.35000000000000653]},{'pos':[-8.800000000000006,-3,-13.549999999999986],'rot':[0,0,0],'size':[1,2.300000000000006,75],'col':[1.0000000000000133,0.13000000000000284,0.1300000000000046]},{'pos':[-10.894903492591416,-0.8697086011498376,21.171052015556274],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.894903492591416,-0.8697086011498376,21.171052015556274],'weapon':'gun'}},{'pos':[-10.76922234674296,-0.8697086011498376,16.982937374148023],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000057],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.76922234674296,-0.8697086011498376,16.982937374148023],'weapon':'gun'}},{'pos':[-10.636942190849954,-0.8697086011498376,12.574921725314987],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000057],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.636942190849954,-0.8697086011498376,12.574921725314987],'weapon':'gun'}},{'pos':[-10.464168109683577,-0.8697086011498376,6.817513530920813],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000052],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.464168109683577,-0.8697086011498376,6.817513530920813],'weapon':'gun'}},{'pos':[-10.735589383936441,-0.8697086011498376,0.5265413888840229],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000055],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.735589383936441,-0.8697086011498376,0.5265413888840229],'weapon':'gun'}},{'pos':[-10.555316427719436,-0.8697086011498376,-5.480754313947392],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000052],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.555316427719436,-0.8697086011498376,-5.480754313947392],'weapon':'gun'}},{'pos':[-10.342048421279694,-0.8697086011498376,-12.58755505390269],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000059],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.342048421279694,-0.8697086011498376,-12.58755505390269],'weapon':'gun'}},{'pos':[-11.297677579967536,-0.8697086011498376,-19.06463927259612],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-11.297677579967536,-0.8697086011498376,-19.06463927259612],'weapon':'gun'}},{'pos':[-11.220404173770788,-0.8697086011498376,-24.971979972052644],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-11.220404173770788,-0.8697086011498376,-24.971979972052644],'weapon':'gun'}},{'pos':[-11.052466824827079,-0.8697086011498376,-30.586963535625117],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000046],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-11.052466824827079,-0.8697086011498376,-30.586963535625117],'weapon':'gun'}},{'pos':[-10.885991798703229,-0.8697086011498376,-36.134466222932],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000055],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.885991798703229,-0.8697086011498376,-36.134466222932],'weapon':'gun'}},{'pos':[-11.09204988008473,-0.8697086011498376,-41.60310774227639],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000016,0.9000000000000039],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-11.09204988008473,-0.8697086011498376,-41.60310774227639],'weapon':'gun'}},{'pos':[-10.91717611390418,-0.8697086011498376,-47.43048443903301],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000005],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.91717611390418,-0.8697086011498376,-47.43048443903301],'weapon':'gun'}},{'pos':[-4.500000000000001,1.4500000000000008,18.95],'rot':[0,0,0],'size':[1,5.150000000000018,10],'col':[1.000000000000015,0.13000000000000284,0.1300000000000046]}]#[0,8,0]#[0,0,20]#[0,-2,-45]#[0,-2,10]",
    '[{"pos":[0,-4,20],"size":[15,2,15],"rot":[0,0,0],"col":[0.2800000000000108,0.2800000000000108,0.28000000000001524]},{"pos":[-8.499999999999996,-4,13.250000000000007],"rot":[0,0,0],"size":[2,28,28.949999999999946],"col":[0.280000000000012,0.280000000000012,0.28000000000001646]},{"pos":[8.499999999999993,-4,12.59999999999999],"rot":[0,0,0],"size":[2,28,36.650000000000205],"col":[0.2800000000000129,0.2800000000000129,0.28000000000001735]},{"pos":[-3.191891195797325e-16,-4,28.499999999999993],"rot":[0,90,0],"size":[2,28,17],"col":[0.2800000000000147,0.2800000000000147,0.2800000000000191]},{"pos":[-3.191891195797325e-16,-4,11.500000000000032],"rot":[0,90,0],"size":[2,12,17],"col":[0.2800000000000138,0.2800000000000138,0.28000000000001823]},{"pos":[0,0,5],"rot":[0,90,0],"size":[11,4,17],"col":[0.28000000000001557,0.28000000000001557,0.28000000000002]},{"pos":[0,0,-1.5000000000000024],"rot":[0,90,0],"size":[2,25,19.20000000000003],"col":[0.28000000000001646,0.28000000000001646,0.2800000000000209]},{"pos":[0,11,13.549999999999955],"rot":[0,0,0],"size":[15,2,33.049999999999976],"col":[0.2800000000000129,0.2800000000000129,0.28000000000001735]},{"pos":[2.6943432388636337,7.5,12],"size":[21.999999999999964,11,1],"col":[0.1499999999999999,0.4000000000000039,1.0000000000000133],"rot":[0,0,0],"useTex":false,"special":"glass"},{"pos":[-1.1183227043102237,0.014824197313455148,16.942025060291417],"rot":[46,40,79],"size":[1,1,1],"col":[0.09999999999999987,0.30000000000000293,0.9000000000000106],"useTex":false,"partInfo":{"instance":"box","pos":[-1.1183227043102237,0.014824197313455148,16.942025060291417],"mass":1,"rot":[46,40,79],"size":[1,1,1]}},{"pos":[8.499999999999993,-3.9375000000000027,19.087500000000063],"rot":[24,0,0],"size":[5.549999999999987,5.450000000000011,16.950000000000344],"col":[0.4700000000000003,0.4700000000000003,0.4700000000000003]},{"pos":[2.9090533710777056,-2.104489037277261,19.310602920626614],"rot":[0,54,0],"size":[0.2,0.2,0.2],"col":[0.4000000000000008,0.4000000000000008,0.4000000000000008],"useTex":false,"partInfo":{"instance":"weapon","type":"candycane","pos":[2.9090533710777056,-2.104489037277261,19.310602920626614],"rot":[0,54,0]}},{"pos":[-1.0590030500679548,4.3455109627227415,7.713791689053154],"size":[0.75,1.325,0.75],"col":[0.09999999999999978,0.3000000000000008,0.9000000000000032],"rot":[0,0,0],"useTex":false,"partInfo":{"instance":"enemy","pos":[-1.0590030500679548,4.3455109627227415,7.713791689053154],"weapon":"gun"}}]#[0,11.400000000000087,7]#[0,0,24]#[0,3.749999999999842,4.249999999999905]#[-5,-2,15]',
    "[{'pos':[-8,-4,8],'size':[35,2,35],'rot':[0,0,0],'col':[0.2800000000000046,0.2800000000000046,0.280000000000009]},{'pos':[-5.751005783950607,-2.6663970960020817,20.73096479622799],'rot':[0,0,0],'size':[1.5000000000000007,1,3.2499999999999964],'col':[0.3300000000000094,0.5483612360776271,1.0000000000000369],'useTex':false},{'pos':[-5.449999999999998,-1.8333736669261758,20.06595583494897],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000001634,0.40000000000001634,0.40000000000001634],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[-5.449999999999998,-1.8333736669261758,20.06595583494897],'rot':[0,0,0]}},{'pos':[-9.450000000000006,-0.7999999999999992,0.5250000000000001],'rot':[0,0,0],'size':[10,7.64999999999998,10],'col':[1.0000000000000329,0.5881889851114221,0]},{'pos':[-4.969227149929305,3.9928723069789953,4.796334554040681],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.30000000000000604,0.9000000000000246],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-4.969227149929305,4.992872306978995,4.796334554040681],'weapon':'gun'}},{'pos':[-11.550000000000036,-3.5000000000000044,8.149999999999944],'rot':[35,0,0],'size':[3.5999999999999788,7.64999999999998,11.800000000000026],'col':[1.0000000000000142,0.6381889851114204,0]},{'pos':[-5.6588426248196155,-1.5526859111098303,21.303597945516945],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'bow','pos':[-5.6588426248196155,-1.5526859111098303,21.303597945516945],'rot':[0,0,0]}},{'pos':[3,-4,5],'rot':[22,0,0],'size':[6,2,28.900000000000208],'col':[0.280000000000004,0.280000000000004,0.28000000000000846]},{'pos':[4.737499999999996,-0.7999999999999992,-13],'rot':[0,0,0],'size':[9.449999999999992,6.26249999999998,10],'col':[1.0000000000000355,0.5881889851114221,0]},{'pos':[8.315377365400888,3.575568573104672,-16.828075863976945],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[8.315377365400888,4.575568573104672,-16.828075863976945],'weapon':'shotgun'}},{'pos':[-11,-4,-20],'rot':[0,0,0],'size':[7,3,7],'col':[0,1.0000000000000018,0.24034377360238768]},{'pos':[-13.82323429102194,-2.799134548137424,6.0632463337568865],'rot':[0,0,0],'size':[0.125,0.21250000000000005,0.13750000000000145],'col':[1.0000000000000044,0.5017778127376942,0.698239828882854],'useTex':false},{'pos':[-13.81073429102194,-2.861634548137425,6.025746333756886],'rot':[0,0,0],'size':[0.08749999999999986,0.21250000000000005,0.06250000000000146],'col':[1.0000000000000133,0.5017778127376977,0.6982398288828595],'useTex':false},{'pos':[-13.81073429102194,-2.861634548137425,6.113246333756887],'rot':[0,0,0],'size':[0.08749999999999986,0.21250000000000005,0.06250000000000146],'col':[1.0000000000000178,0.5017778127376995,0.6982398288828621],'useTex':false},{'pos':[-13.83573429102194,-2.7616345481374234,6.0632463337568865],'rot':[0,0,0],'size':[0.125,0.03750000000000213,0.075],'col':[0,0.8799999999999999,1],'useTex':false}]#[-8,11.400000000000087,7]#[0,0,20]#[-11,-1.6500000000000008,-20]#[-8,-2,8]",
    "[{'pos':[0,-4,0],'size':[75,2.299999999999999,75],'rot':[0,0,0],'col':[0.12000000000000487,0.24000000000000787,0.5800000000000076]},{'pos':[3.599999999999995,1.925000104166537,-0.9999375001301993],'rot':[0,0,0],'size':[12.900000000000048,10.000000000000007,1.7500000000000007],'col':[0.24196248359405603,0.36145490673762226,1.0000000000000604]},{'pos':[-9.298058564675847,1.9857850724379167,0.0018397199419913496],'rot':[0,0,0],'size':[1.0000000000000002,10.000000000000007,35.050000000000146],'col':[0.2433021804717847,0.3605836052738972,1.0000000000000604]},{'pos':[0.17503890276860745,2.0652834989834936,17.978246565690082],'rot':[0,0,0],'size':[20.00000000000015,10.000000000000007,1.0000000000000002],'col':[0.25000000000001354,0.3661636927536225,1.0000000000000488]},{'pos':[9.686012641956891,1.9703026746700025,-0.15534976807045472],'rot':[0,0,0],'size':[1,10.000000000000007,35.050000000000146],'col':[0.2500000000000151,0.3660271135139692,1.0000000000000444]},{'pos':[5.694738766279569,-3.7250130204264345,15.021095699693655],'rot':[0,0,0],'size':[6.999999999999983,10.400000000000013,4.99999999999999],'col':[0.32000000000001494,0.32000000000001494,0.3180182622560328]},{'pos':[5.8483428414841,-5.255723789711338,9.404791432969008],'rot':[67,0,0],'size':[7.149999999999983,11.050000000000022,9.900000000000006],'col':[0.3398088464561657,0.33000000000000673,0.3358612629323017]},{'pos':[-3.7179180600883255,-1.722114007228154,10.705414969927599],'size':[0.75,1.325,0.75],'col':[1.0000000000000373,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-3.7179180600883255,-1.722114007228154,10.705414969927599]}},{'pos':[-5.472496328494031,0.5209627983802184,11.37721502533107],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000065,0.9000000000000239],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-5.472496328494031,0.5209627983802184,11.37721502533107],'weapon':'gun'}},{'pos':[-1.651210105492104,0.5133077641052451,13.054005380691173],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000056,0.9000000000000195],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-1.651210105492104,0.5133077641052451,13.054005380691173],'weapon':'boomer'}},{'pos':[0.22461733583398358,-2.76808708348568,-9.541934399989518],'size':[20.250000000000153,1,16.050000000000093],'col':[2,0,0],'rot':[0,0,0],'useTex':false,'special':'lava'},{'pos':[0.3702588167820275,2.034276210288681,-17.24155255038356],'rot':[0,0,0],'size':[20.250000000000153,10.400000000000013,1],'col':[0.24000000000000288,0.36000000000000454,1.0000000000000195]},{'pos':[-5.809872814202615,-3.7764020257014215,-2.6073135596498664],'rot':[33,0,0],'size':[6.0499999999999865,7.199999999999982,7.649999999999981],'col':[0.3261831820896304,0.3200000000000043,0.3196902242752011]},{'pos':[-5.797012927609472,0.77911376558551,-6.955498449813241],'rot':[0,0,0],'size':[5.999999999999987,1,5.999999999999987],'col':[0.3200000000000034,0.32083121884969623,0.31707609714742313]},{'pos':[-5.797012927609472,0.77911376558551,-6.955498449813241],'rot':[0,0,0],'size':[5.999999999999987,1,5.999999999999987],'col':[0.3200000000000043,0.3208312188496971,0.317076097147424]},{'pos':[2.1163500890227853,0.7467876330248681,-12.767774037934817],'rot':[0,29,0],'size':[19.550000000000143,1,4.049999999999994],'col':[0.3200000000000034,0.3290821657892695,0.32241013804925833]},{'pos':[2.7586517531235932,3.942689404416047,-13.25893358475626],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000177],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[2.7586517531235932,3.942689404416047,-13.25893358475626],'weapon':'shotgun'}},{'pos':[-7.716157046992773,3.3230192408510995,-7.0276431053353505],'size':[0.75,1.325,0.75],'col':[1.0000000000000222,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-7.716157046992773,3.3230192408510995,-7.0276431053353505]}},{'pos':[-5.756824304187812,5.381912916514343,-7.048712533387668],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000141],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-5.756824304187812,5.381912916514343,-7.048712533387668],'weapon':'boomer'}},{'pos':[-4.030667748143403,5.186784400145744,-6.4686862102450355],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000141],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-4.030667748143403,5.186784400145744,-6.4686862102450355],'weapon':'railgun'}},{'pos':[4.04718999626761,2.527874225236679,16.221004166397417],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.400000000000003,0.400000000000003,0.400000000000003],'useTex':false,'partInfo':{'instance':'weapon','type':'candycane','pos':[4.04718999626761,2.527874225236679,16.221004166397417],'rot':[0,0,0]}},{'pos':[3.8481085650287623,2.615207388573068,14.43289586639822],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.400000000000003,0.400000000000003,0.400000000000003],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[3.8481085650287623,2.615207388573068,14.43289586639822],'rot':[0,0,0]}},{'pos':[4.132763523794623,1.6970642218105327,15.316831368844085],'rot':[0,0,0],'size':[1,1,3.049999999999997],'col':[0.6524593415633027,0.9085726751748058,0.8479203686852399]},{'pos':[2.2186492629039547,1.9380728023442706,11.410987173226976],'size':[0.049999999999999684,10.20000000000001,11.950000000000035],'col':[0.1499999999999999,0.40000000000000213,1.0000000000000089],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0.2734692274529974,8.020681975324699,0.6932619842730381],'rot':[0,0,0],'size':[20.10000000000015,2.000000000000001,35.600000000000115],'col':[0.8802934209234492,0.570960663400238,0.3818249790054107]}]#[0.15000000000000002,8,10.000000000000007]#[6.749999999999984,4.449999999999993,15.199999999999932]#[7.399999999999983,2.2000000000000006,-15.250000000000073]#[0,-2,8]",
    '[{"pos":[0,-4,0],"size":[75,2,75],"rot":[0,0,0],"col":[0.09999999999999987,0.5000000000000182,1.0000000000000404]},{"pos":[9.45,12.000000000000036,-9.999999999999996],"rot":[0,0,0],"size":[50.049999999999294,30.00000000000029,2.9999999999999973],"col":[0.40268368695494683,0.4020917653161087,0.4016042323883964]},{"pos":[-14.03341896304691,11.979977501012486,3.5214394923647294],"rot":[0,0,0],"size":[2.9999999999999973,30.00000000000029,30.00000000000029],"col":[0.3987029573449543,0.3939253871950681,0.4204205525834235]},{"pos":[9.499976279362338,12.020688217634639,17.110313392845534],"rot":[0,0,0],"size":[49.9999999999993,30.00000000000029,2.9999999999999973],"col":[0.40106815125289774,0.4105877447049364,0.41167125346967026]},{"pos":[12.983486391801431,7.018222588275066,3.452748910173807],"rot":[0,0,0],"size":[2.9999999999999973,20.05000000000015,30.00000000000029],"col":[0.4099928715870833,0.4101220215129642,0.4078350188787754]},{"pos":[-9.544697525079808,-4.365729148634452,3.939686417884346],"rot":[26,0,0],"size":[5.999999999999987,7.79999999999998,18.00000000000012],"col":[0.4002926245529723,0.40938396415861966,0.4041194395330159]},{"pos":[-9.463440045009133,1.5766349424180859,-5.425178205968246],"rot":[0,0,0],"size":[5.999999999999987,2.9999999999999973,5.999999999999987],"col":[0.40192733533801217,0.4099500425452822,0.39287428793849144]},{"pos":[4.108249934115948,0.3490579243840911,-5.447147462698255],"rot":[0,0,39],"size":[30.800000000000303,18.00000000000012,5.999999999999987],"col":[0.40017485684636167,0.4016074480416698,0.4058258965196453]},{"pos":[22.34317956658859,6.975651824981331,3.4324487431609896],"rot":[0,0,0],"size":[24.050000000000207,20.10000000000015,30.150000000000293],"col":[0.40834075852746293,0.3990636198347352,0.4106973435515639]},{"pos":[11.397622111884981,20.779190166422026,7.395847510116511],"size":[0.1499999999999997,11.65000000000003,17.450000000000113],"col":[0.1499999999999999,0.400000000000019,1.0000000000000604],"rot":[0,0,0],"useTex":false,"special":"glass"},{"pos":[11.368193712422302,21.588194885435943,-1.6530666086548838],"rot":[0,0,0],"size":[2.000000000000001,10.050000000000008,2.000000000000001],"col":[0.4051015238675495,0.3946061981032887,0.3993659295239371]},{"pos":[11.311556169953683,21.63603487990765,-5.7069879460822],"size":[0.1,10.000000000000007,6.0499999999999865],"col":[0.1499999999999999,0.400000000000019,1.0000000000000524],"rot":[0,0,0],"useTex":false,"special":"glass"},{"pos":[2.989292319657214,1.0419129165142569,8.37411252056378],"rot":[0,0,0],"size":[0.2,0.2,0.2],"col":[0.4000000000000181,0.4000000000000181,0.4000000000000181],"useTex":false,"partInfo":{"instance":"weapon","type":"banana","pos":[2.989292319657214,1.0419129165142569,8.37411252056378],"rot":[0,0,0]}},{"pos":[-0.02124204800427086,1.0150700648171598,8.33341798294305],"rot":[0,0,0],"size":[0.2,0.2,0.2],"col":[0.40000000000001457,0.40000000000001457,0.40000000000001457],"useTex":false,"partInfo":{"instance":"weapon","type":"gun","pos":[-0.02124204800427086,1.0150700648171598,8.33341798294305],"rot":[0,0,0]}},{"pos":[32.932929775707095,20.939880316040572,3.574174100912272],"rot":[0,0,0],"size":[2.9999999999999973,12.000000000000036,30.00000000000029],"col":[0.42059188908740097,0.41553397178857754,0.4130910311098379]},{"pos":[1.3520341346935913,-2.5470917115432514,8.228905934376886],"rot":[0,0,0],"size":[5.999999999999987,2.000000000000001,2.000000000000001],"col":[1,0.5337572300816457,0.34000000000000014],"useTex":false},{"pos":[-9.297456558403553,6.7970642218104835,-4.654829484671379],"size":[0.75,1.325,0.75],"col":[0.09999999999999978,0.30000000000000693,0.9000000000000281],"rot":[0,0,0],"useTex":false,"partInfo":{"instance":"enemy","pos":[-9.297456558403553,6.7970642218104835,-4.654829484671379],"weapon":"shotgun"}},{"pos":[15.050397901616774,20.982872306979008,6.9848399582380605],"size":[0.75,1.325,0.75],"col":[0.09999999999999978,0.30000000000000604,0.9000000000000246],"rot":[0,0,0],"useTex":false,"partInfo":{"instance":"enemy","pos":[15.050397901616774,20.982872306979008,6.9848399582380605],"weapon":"railgun"}},{"pos":[17.672706677275173,21.026870559144232,7.21827936116666],"size":[0.75,1.325,0.75],"col":[0.09999999999999978,0.30000000000000426,0.9000000000000175],"rot":[0,0,0],"useTex":false,"partInfo":{"instance":"enemy","pos":[17.672706677275173,21.026870559144232,7.21827936116666],"weapon":"gun"}},{"pos":[23.5890777843679,20.255513416361524,-0.5050007098197922],"size":[0.75,1.325,0.75],"col":[0.09999999999999987,0.3000000000000038,0.9000000000000141],"rot":[0,0,0],"useTex":false,"partInfo":{"instance":"enemy","pos":[23.5890777843679,20.255513416361524,-0.5050007098197922],"weapon":"gun"}},{"pos":[19.09532124654372,20.93288387202984,6.069248760051487],"size":[0.75,1.325,0.75],"col":[1.0000000000000089,0,0],"rot":[0,0,0],"useTex":false,"partInfo":{"instance":"barrel","pos":[19.09532124654372,20.93288387202984,6.069248760051487]}},{"pos":[0,26.649999999999917,0],"rot":[0,0,0],"size":[75,2,75],"col":[0.09999999999999978,0.5000000000000182,1.0000000000000417]},{"pos":[3.355747783982814,-3.1077956837374874,-10.876386304179775],"size":[28.249999999999936,1,26.449999999999942],"col":[1.9999999999999998,0,0],"rot":[0,0,0],"useTex":false,"special":"lava"}]#[-0.6499999999999999,41.89999999999978,3.499999999999996]#[0.30000000000000016,1.4000000000000004,13.099999999999902]#[27.85000000000026,19.550000000000143,13.150000000000063]#[4,-1,13]',
    
    "[{'pos':[0,-24.349999999999948,0],'size':[73.50000000000009,1.9499999999999997,87.1],'rot':[0,0,0],'col':[0.3200000000000105,0.33000000000001295,0.3375000000000141]},{'pos':[0,-4,18.199999999999967],'rot':[0,0,0],'size':[22.199999999999427,40.20000000000004,45.59999999999958],'col':[0.32000000000001405,0.3300000000000165,0.33750000000001856]},{'pos':[0.4500000000000099,-3.9874999999999936,44.80000000000017],'rot':[0,0,0],'size':[83.09999999999981,40.18749999999995,8.649999999999526],'col':[0.32000000000001316,0.3300000000000156,0.3375000000000177]},{'pos':[41.25000000000005,-4,2.4000000000000377],'rot':[0,0,0],'size':[8.749999999999442,40.20000000000004,85.2000000000001],'col':[0.3200000000000123,0.3300000000000147,0.3375000000000168]},{'pos':[-0.2999999999999721,-4,-42.850000000000016],'rot':[0,0,0],'size':[91.14999999999952,40.18749999999995,5.949999999999434],'col':[0.3200000000000123,0.3300000000000147,0.3375000000000168]},{'pos':[-41.850000000000264,-4,2.4000000000000377],'rot':[0,0,0],'size':[8.749999999999442,40.20000000000004,85.2000000000001],'col':[0.32000000000001316,0.3300000000000156,0.3375000000000177]},{'pos':[-4.642579895621827,-21.030924758063477,2.690125231062985],'size':[105.60000000000096,2.0500000000000185,102.50000000000088],'col':[1.9999999999999998,0,0],'rot':[0,0,0],'useTex':false,'special':'lava'},{'pos':[21.849999999999905,-0.5499999999999946,37.39999999999991],'rot':[0,0,0],'size':[8.499999999999469,2,7.399999999999505],'col':[0.32000000000001383,0.3300000000000163,0.33750000000001834]},{'pos':[18.888120505431388,0.9156459878540615,37.236812303362306],'rot':[0,0,0],'size':[0.95,1,3.950000000000009],'col':[1.0000000000000133,0.5611008535567099,0],'useTex':false},{'pos':[18.855007218108945,2.2056459878540613,38.260169685454294],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.400000000000006,0.400000000000006,0.400000000000006],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[18.855007218108945,2.2056459878540613,38.260169685454294],'rot':[0,0,0]}},{'pos':[18.855007218108945,2.2056459878540613,36.260169685454294],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000524,0.40000000000000524,0.40000000000000524],'useTex':false,'partInfo':{'instance':'weapon','type':'wand','pos':[18.855007218108945,2.2056459878540613,36.260169685454294],'rot':[0,0,0]}},{'pos':[21.849999999999905,-0.5499999999999946,20.999999999999837],'rot':[0,0,0],'size':[5,1,5],'col':[0.3200000000000123,0.3300000000000147,0.3375000000000168]},{'pos':[21.849999999999905,-0.5499999999999946,11.599999999999884],'rot':[17,0,0],'size':[5,1,5],'col':[0.32000000000001294,0.3300000000000154,0.33750000000001745]},{'pos':[21.849999999999905,0.4000000000000054,1.6499999999998747],'rot':[34,326,0],'size':[5,1,6.749999999999994],'col':[0.32000000000001405,0.3300000000000165,0.33750000000001856]},{'pos':[14.999999999999932,1.300000000000006,-8.500000000000131],'rot':[34,42,0],'size':[5,1,6.749999999999994],'col':[0.32000000000001494,0.3300000000000174,0.33750000000001945]},{'pos':[2.5178981612626146,11.075138624864783,-17.45864817742305],'rot':[0,0,0],'size':[2,2,51.55000000000016],'col':[1.000000000000008,0.5917849300006095,0],'useTex':false},{'pos':[-20.432101838737353,11.075138624864783,-17.45864817742305],'rot':[0,35,0],'size':[2,2,58.70000000000022],'col':[1.0000000000000162,0.5917849300006128,0],'useTex':false},{'pos':[-22.032101838737397,7.075138624864826,9.241351822576942],'rot':[0,90,0],'size':[2,2,39.049999999999855],'col':[1.00000000000002,0.5917849300006146,0],'useTex':false},{'pos':[-29.250000000000014,-0.5499999999999946,37.39999999999991],'rot':[0,0,0],'size':[25,2,11],'col':[0.3200000000000123,0.3300000000000147,0.3375000000000168]},{'pos':[-35.27973078097481,3.648560441859276,34.35652398868447],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000101],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-35.27973078097481,3.648560441859276,34.35652398868447],'weapon':'shotgun'}},{'pos':[34.499999999999844,-0.5499999999999946,-36.55000000000015],'rot':[0,0,0],'size':[8.499999999999469,2,7.399999999999505],'col':[0.32000000000001316,0.3300000000000156,0.3375000000000177]},{'pos':[32.47529702692698,3.63220431626251,-35.257772619507485],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000097],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[32.47529702692698,3.63220431626251,-35.257772619507485],'weapon':'boomer'}},{'pos':[-11.567697507457225,12.344113765585467,-4.126034055088482],'rot':[0,0,0],'size':[0.15,0.25000000000000155,0.15000000000000147],'col':[1.0000000000000044,1.0000000000000044,1.0000000000000044],'useTex':false},{'pos':[-11.617697507457223,12.156613765585467,-4.126034055088482],'rot':[0,0,0],'size':[0.0625,0.25000000000000155,0.15000000000000147],'col':[1.0000000000000084,1.0000000000000084,1.0000000000000084],'useTex':false},{'pos':[-11.530197507457228,12.156613765585467,-4.126034055088482],'rot':[0,0,0],'size':[0.0625,0.25000000000000155,0.15000000000000147],'col':[1.0000000000000089,1.0000000000000089,1.0000000000000089],'useTex':false},{'pos':[-11.567697507457225,12.40661376558547,-4.1635340550884825],'rot':[0,0,0],'size':[0.09999999999999999,0.05,0.15000000000000147],'col':[0,0.5100000000000084,1],'useTex':false}]#[0,8,0]#[21.899999999999935,2.899999999999962,37.699999999999946]#[-24.849999999999945,1.5500000000000156,36.24999999999983]#[-23,1,36]",
    "[{'pos':[0,-4,0],'size':[75,2,75],'rot':[0,0,0],'col':[0.3300000000000112,0.33000000000001384,0.32250000000001533]},{'pos':[15.199999999999708,17.412499999999994,0],'rot':[0,0,0],'size':[2,41,75],'col':[0.33000000000002094,0.3300000000000236,0.322500000000026]},{'pos':[-37.26249999999996,17.412499999999994,0],'rot':[0,0,0],'size':[2,41,75],'col':[0.33000000000002094,0.3300000000000236,0.322500000000026]},{'pos':[0,17.38749999999999,-12.499999999999979],'rot':[0,0,0],'size':[75,41,2],'col':[0.33000000000002094,0.3300000000000236,0.322500000000026]},{'pos':[0,17.38749999999999,37.14999999999965],'rot':[0,0,0],'size':[75,41,2],'col':[0.33000000000002094,0.3300000000000236,0.322500000000026]},{'pos':[-2.6843052927279816,-3.004285843172761,18.42341586364307],'rot':[0,28,0],'size':[2,16,2],'col':[1.000000000000053,0.13378872473558667,0.14000000000000012]},{'pos':[-10.134305292727975,-3.004285843172761,34.54999999999997],'rot':[0,0,47],'size':[1,15.300000000000022,3.900000000000036],'col':[1.0000000000000433,0.13378872473558667,0.14000000000000012]},{'pos':[-17.871805292727952,2.108214156827239,33.37341586364296],'rot':[0,0,0],'size':[5,1,6.149999999999979],'col':[1.0000000000000446,0.13378872473558667,0.14000000000000012]},{'pos':[-18.12727512184384,4.142398966693323,32.86287008229932],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000161,0.4000000000000161,0.4000000000000161],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[-18.12727512184384,4.142398966693323,32.86287008229932],'rot':[0,0,0]}},{'pos':[-2.6843052927279816,-3.004285843172761,31.673415863643033],'rot':[0,0,0],'size':[1,11.800000000000026,12.200000000000031],'col':[1.00000000000005,0.13378872473558667,0.14000000000000012]},{'pos':[-2.6843052927279816,4.9957141568272405,18.42341586364307],'rot':[0,28,0],'size':[7,1,7],'col':[1.00000000000004,0.13378872473558667,0.14000000000000012]},{'pos':[-2.6843052927279816,5.883214156827242,31.673415863643033],'rot':[0,82,0],'size':[1,6,9],'col':[1.0000000000000364,0.13378872473558667,0.14000000000000012]},{'pos':[4.165694707272011,-2.8042858431727615,23.123415863642986],'rot':[0,28,167],'size':[2,23,2],'col':[1.0000000000000384,0.13378872473558667,0.14000000000000012]},{'pos':[5.315694707272007,8.395714156827248,23.123415863642986],'rot':[0,0,0],'size':[6,1,6],'col':[1.0000000000000406,0.13378872473558667,0.14000000000000012]},{'pos':[5.315694707272007,8.395714156827248,23.123415863642986],'rot':[0,0,0],'size':[6,1,6],'col':[1.000000000000044,0.13378872473558667,0.14000000000000012]},{'pos':[1.8781076024174121,0.5919228401751904,10.378497526338691],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000086],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[1.8781076024174121,0.5919228401751904,10.378497526338691],'weapon':'gun'}},{'pos':[5.316292132176831,0.771922840175191,9.20164276073548],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000086],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[5.316292132176831,0.771922840175191,9.20164276073548],'weapon':'boomer'}},{'pos':[2.6012027875973107,0.4119228401751922,8.718848963187552],'size':[0.75,1.325,0.75],'col':[1.000000000000016,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[2.6012027875973107,0.4119228401751922,8.718848963187552]}},{'pos':[7.715694707272023,10.395714156827253,8.623415863643121],'rot':[41,28,58],'size':[15.099999999999959,1.6000000000000036,4.8500000000000085],'col':[1.00000000000004,0.13378872473558667,0.14000000000000012]},{'pos':[37.215694707272014,-3.004285843172761,29.473415863643],'rot':[0,0,0],'size':[19.849999999999962,11.800000000000026,19.65000000000001],'col':[1.0000000000000429,0.13378872473558667,0.14000000000000012]},{'pos':[7.165694707272033,2.4457141568272407,7.573415863642915],'rot':[0,0,0],'size':[1,17.550000000000008,1],'col':[1.000000000000047,0.13378872473558667,0.14000000000000012]},{'pos':[-29.321805292727912,2.108214156827239,33.37341586364296],'rot':[22,0,0],'size':[5,1,14.499999999999957],'col':[1.0000000000000429,0.13378872473558667,0.14000000000000012]},{'pos':[-18.421805292727942,2.108214156827239,18.67341586364306],'rot':[0,0,0],'size':[3,16.39999999999998,3],'col':[1.000000000000048,0.13378872473558667,0.14000000000000012]},{'pos':[-18.421805292727942,5,18.67341586364306],'rot':[0,0,0],'size':[9,1,9],'col':[1.000000000000048,0.13378872473558667,0.14000000000000012]},{'pos':[-15.800983637815836,8.311912916514277,15.008239319608684],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000097],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-15.800983637815836,8.311912916514277,15.008239319608684],'weapon':'bow'}},{'pos':[-3.0161060022079744,8.64191291651429,17.6707641491152],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'railgun','pos':[-3.0161060022079744,8.64191291651429,17.6707641491152],'rot':[0,0,0]}},{'pos':[-15.384305292727962,4.9957141568272405,3.823415863643042],'rot':[0,114,0],'size':[2,25.450000000000006,2],'col':[1.0000000000000409,0.13378872473558667,0.14000000000000012]},{'pos':[-15.384305292727962,-1.604285843172761,3.823415863643042],'rot':[0,114,0],'size':[9.35,5.59999999999997,7.650000000000005],'col':[1.0000000000000466,0.13378872473558667,0.14000000000000012]},{'pos':[-15.384305292727962,-1.604285843172761,3.823415863643042],'rot':[0,114,0],'size':[4.499999999999987,16.099999999999945,4.750000000000005],'col':[1.0000000000000466,0.13378872473558667,0.14000000000000012]},{'pos':[-37.42180529272796,2.108214156827239,18.67341586364306],'rot':[0,0,0],'size':[15.299999999999978,19.949999999999974,12.399999999999988],'col':[1.0000000000000495,0.13378872473558667,0.14000000000000012]},{'pos':[-37.42180529272796,8.108214156827243,-0.2765841363569081],'rot':[140,0,0],'size':[15.299999999999978,2.5,12.399999999999988],'col':[1.0000000000000537,0.13378872473558667,0.14000000000000012]},{'pos':[-20.271805292727905,7.858214156827242,-0.2765841363569081],'rot':[0,0,0],'size':[26.499999999999936,1,2.8999999999999955],'col':[1.0000000000000582,0.13378872473558667,0.14000000000000012]},{'pos':[-5.634305292727976,-1.604285843172761,-9.726584136356959],'rot':[0,160,0],'size':[9.35,17.59999999999986,7.650000000000005],'col':[1.0000000000000524,0.1337887247355865,0.13999999999999996]},{'pos':[-21.584305292727933,-1.90428584317276,-9.726584136356959],'rot':[0,0,0],'size':[9.35,12.39999999999997,7.650000000000005],'col':[1.0000000000000524,0.1337887247355865,0.13999999999999996]},{'pos':[4.315694707272021,3.2957141568272394,-3.5765841363569204],'rot':[28,324,0],'size':[5.75000000000001,3,34.300000000000004],'col':[1.0000000000000524,0.1337887247355865,0.13999999999999996]},{'pos':[-10.493257590513236,11.17528349898343,0.2406416899632079],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.493257590513236,11.17528349898343,0.2406416899632079],'weapon':'shotgun'}},{'pos':[5.788675867613468,11.755283498983413,24.39084418180312],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[5.788675867613468,11.755283498983413,24.39084418180312],'weapon':'boomer'}},{'pos':[-9.876109802029749,-1.4997405348276007,24.01574971562736],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[-9.876109802029749,-1.4997405348276007,24.01574971562736],'rot':[0,0,0]}},{'pos':[-5.034896980105729,8.868534123953694,-10.34201627296977],'size':[6.749999999999993,8.099999999999989,7.749999999999992],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,160.25,0],'useTex':false,'special':'glass'},{'pos':[-12.962724005838348,-2.818871166375449,35.89677677641535],'rot':[0,0,0],'size':[0.16250000000000148,0.1875000000000015,0.15000000000000147],'col':[0,0,1.0000000000000044],'useTex':false},{'pos':[-13.012724005838345,-2.8563711663754496,35.89677677641535],'rot':[0,0,0],'size':[0.0625,0.23750000000000154,0.15000000000000147],'col':[0,0,1.0000000000000089],'useTex':false},{'pos':[-12.912724005838351,-2.8563711663754496,35.89677677641535],'rot':[0,0,0],'size':[0.0625,0.23750000000000154,0.15000000000000147],'col':[0,0,1.0000000000000089],'useTex':false},{'pos':[-12.962724005838348,-2.818871166375449,35.88427677641535],'rot':[0,0,0],'size':[0.0875,0.06250000000000146,0.15000000000000147],'col':[0,0.2,1.0000000000000089],'useTex':false}]#[0,8,0]#[-7.700000000000005,0,30.300000000000008]#[-5.150000000000004,8.599999999999977,-9.300000000000006]#[-7,-1,20]",
    "[{'pos':[0,-11.937500000000004,0],'size':[75,2,145.7999999999996],'rot':[0,0,0],'col':[0.33000000000001206,0.32000000000001494,0.34000000000001185]},{'pos':[-7,-4,0],'rot':[0,0,0],'size':[2,26.14999999999994,121.75000000000043],'col':[0.3300000000000236,0.3200000000000256,0.3400000000000225]},{'pos':[6,-4,-19.44999999999996],'rot':[0,0,0],'size':[2,26.14999999999994,96.3000000000001],'col':[0.3300000000000245,0.3200000000000265,0.3400000000000234]},{'pos':[9.512500000000028,-4,29.3874999999999],'rot':[0,0,0],'size':[9,26.14999999999994,2],'col':[0.3300000000000254,0.3200000000000274,0.3400000000000243]},{'pos':[9.512500000000028,-4,42.337500000000034],'rot':[0,0,0],'size':[37.550000000000004,26.14999999999994,2],'col':[0.3300000000000263,0.32000000000002826,0.34000000000002517]},{'pos':[14.6125000000001,-4,36.48750000000037],'rot':[0,90,0],'size':[14.300000000000075,26.14999999999994,1.2999999999999998],'col':[0.3300000000000263,0.32000000000002826,0.34000000000002517]},{'pos':[6.162500000000041,-4,29.362499999999997],'rot':[0,0,0],'size':[9.59999999999997,26.14999999999994,2],'col':[0.33000000000002716,0.32000000000002915,0.34000000000002606]},{'pos':[-7.83749999999997,-4,29.362499999999997],'rot':[0,0,0],'size':[9.59999999999997,26.14999999999994,2],'col':[0.33000000000002805,0.32000000000003004,0.34000000000002695]},{'pos':[-7.83749999999997,7.100000000000004,29.362499999999997],'rot':[0,0,0],'size':[20.89999999999994,23.999999999999957,1.9500000000000002],'col':[0.33000000000002894,0.3200000000000309,0.34000000000002784]},{'pos':[-7.83749999999997,7.100000000000004,44.06250000000017],'rot':[0,0,0],'size':[67.35000000000039,3.89999999999999,29.14999999999993],'col':[0.3300000000000298,0.3200000000000318,0.3400000000000287]},{'pos':[0,7.012500000000002,0],'rot':[0,0,0],'size':[75,8,145.7999999999996],'col':[0.33000000000002183,0.3200000000000247,0.3400000000000216]},{'pos':[-4.649999999999998,-10.457734684780515,-4.871233670295491],'rot':[28,0,0],'size':[3,1,25.84999999999995],'col':[1.0000000000000484,0.12573764750128502,0.1499999999999999]},{'pos':[-4.649999999999998,-4.432734684780515,-18.396233670295448],'rot':[0,0,0],'size':[26.69999999999996,1,4.7500000000000115],'col':[1.000000000000056,0.12573764750128485,0.14999999999999974]},{'pos':[3.049999999999999,-11.287499999999994,-20.39999999999995],'rot':[0,0,0],'size':[5,14.700000000000017,1],'col':[0.33000000000002183,0.3200000000000247,0.3400000000000216]},{'pos':[-4.700000000000003,-11.287499999999994,-20.39999999999995],'rot':[0,0,0],'size':[5,14.700000000000017,1],'col':[0.33000000000002183,0.3200000000000247,0.3400000000000216]},{'pos':[-1.1500000000000117,-4.699999999999999,-20.39999999999995],'rot':[0,0,0],'size':[5,1.5000000000000004,0.9874999999999986],'col':[0.3300000000000227,0.3200000000000256,0.3400000000000225]},{'pos':[-1.7975360562844402,3.6997848580256782,-20.300000000000004],'size':[33.29999999999994,15.29999999999998,1],'col':[0.1499999999999999,0.40000000000003055,1.000000000000052],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-1.8464565704944755,-6.806065023368973,22.724408395647508],'rot':[68,24,44],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000001625,0.9000000000000519],'useTex':false,'partInfo':{'instance':'box','pos':[-1.8464565704944755,-6.806065023368973,22.724408395647508],'mass':1,'rot':[68,24,44],'size':[1,1,1]}},{'pos':[2.4552396557642147,-6.9134361446532795,19.2861392485557],'size':[1.15,1.15,1.15],'col':[0.09999999999999987,0.30000000000001625,0.9000000000000508],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[2.4552396557642147,-6.9134361446532795,19.2861392485557],'mass':1,'radius':1.15}},{'pos':[0.8194480769951985,-6.9134361446532795,2.7272676681314234],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000001625,0.9000000000000523],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[0.8194480769951985,-6.9134361446532795,2.7272676681314234],'weapon':'gun'}},{'pos':[-1.3299092994617632,-1.4834361446532753,-16.861605699205462],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000001625,0.900000000000055],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-1.3299092994617632,-1.4834361446532753,-16.861605699205462],'weapon':'shotgun'}},{'pos':[0,-11.937500000000004,-52.10000000000028],'rot':[0,0,0],'size':[75,32.99999999999993,7.699999999999198],'col':[0.3300000000000227,0.3200000000000256,0.3400000000000225]},{'pos':[3.049999999999999,-11.237499999999994,-34.999999999999986],'rot':[0,0,0],'size':[5,14.700000000000017,1],'col':[0.3300000000000227,0.3200000000000256,0.3400000000000225]},{'pos':[-0.9500000000000088,-5.087500000000002,-34.999999999999986],'rot':[0,0,0],'size':[5,2.5000000000000306,0.9500000000000002],'col':[0.3300000000000223,0.32000000000002515,0.34000000000002206]},{'pos':[-0.9500000000000088,2.6625000000000063,-43.162500000000136],'rot':[0,0,0],'size':[15.599999999999975,13.550000000000013,17.24999999999997],'col':[0.3300000000000236,0.3200000000000265,0.3400000000000234]},{'pos':[-0.9500000000000088,2.6625000000000063,-43.162500000000136],'rot':[0,0,0],'size':[15.599999999999975,13.550000000000013,17.24999999999997],'col':[0.3300000000000245,0.3200000000000274,0.3400000000000243]},{'pos':[-0.9500000000000088,2.6625000000000063,-43.162500000000136],'rot':[0,0,0],'size':[15.599999999999975,13.550000000000013,17.24999999999997],'col':[0.3300000000000254,0.32000000000002826,0.34000000000002517]},{'pos':[-0.9500000000000088,2.6625000000000063,-43.162500000000136],'rot':[0,0,0],'size':[15.599999999999975,13.550000000000013,17.24999999999997],'col':[0.3300000000000263,0.32000000000002915,0.34000000000002606]},{'pos':[-4.950000000000002,-11.237499999999994,-34.999999999999986],'rot':[0,0,0],'size':[5,14.700000000000017,1],'col':[0.3300000000000187,0.3200000000000216,0.3400000000000185]},{'pos':[-2.3838266060938476,-7.843657183444138,-28.594002002360657],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-2.3838266060938476,-7.843657183444138,-28.594002002360657],'weapon':'gun'}},{'pos':[-3.39687854553027,-8.543657183444145,-30.16186782124021],'size':[0.75,1.325,0.75],'col':[1.0000000000000044,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-3.39687854553027,-8.543657183444145,-30.16186782124021]}},{'pos':[2.0812927261456284,-8.294746472384546,-29.387316860776743],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[2.0812927261456284,-8.294746472384546,-29.387316860776743],'weapon':'bow'}},{'pos':[8.07305173555254,-9.085486364702298,33.64369843010952],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'bow','pos':[8.07305173555254,-9.085486364702298,33.64369843010952],'rot':[0,0,0]}},{'pos':[-4.493970534240883,-8.403129440855775,17.66074402547169],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-4.493970534240883,-8.403129440855775,17.66074402547169],'weapon':'railgun'}},{'pos':[0.19199155585858557,-8.403129440855775,17.80995392100973],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[0.19199155585858557,-8.403129440855775,17.80995392100973],'rot':[0,0,0]}},{'pos':[4.020357355690448,-1.4765439292849842,-17.440347322896628],'rot':[65,123,244],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'shotgun','pos':[4.020357355690448,-1.4765439292849842,-17.440347322896628],'rot':[65,123,244]}},{'pos':[-5.1175580052090845,-10.751714927562093,-6.743233959749801],'rot':[0,0,0],'size':[0.13749999999999998,0.21250000000000166,0.12500000000000056],'col':[1.0000000000000044,1.0000000000000044,0],'useTex':false},{'pos':[-5.080058005209084,-10.901714927562098,-6.743233959749801],'rot':[0,0,0],'size':[0.05,0.21250000000000166,0.12500000000000056],'col':[1.0000000000000133,1.0000000000000133,0],'useTex':false},{'pos':[-5.155058005209087,-10.901714927562098,-6.743233959749801],'rot':[0,0,0],'size':[0.05,0.21250000000000166,0.12500000000000056],'col':[1.0000000000000142,1.0000000000000142,0],'useTex':false},{'pos':[-5.1175580052090845,-10.714214927562095,-6.768233959749802],'rot':[0,0,0],'size':[0.09999999999999999,0.0500000000000016,0.12500000000000056],'col':[0,0.5100000000000084,1],'useTex':false}]#[0,8,0]#[10.99999999999999,-8.549999999999976,35.65000000000001]#[-0.65,-9.600000000000001,-44.54999999999999]#[3,-9,35]",
    "[{'pos':[0,-4,0],'size':[75,2,75],'rot':[0,0,0],'col':[0.32000000000001183,0.3125000000000142,0.34000000000001673]},{'pos':[0,-4,0],'rot':[0,0,0],'size':[3,29,26],'col':[0.32000000000001894,0.3125000000000213,0.34000000000002384]},{'pos':[14,-4,13],'rot':[0,90,0],'size':[3,29,26],'col':[0.3200000000000167,0.3125000000000191,0.3400000000000216]},{'pos':[16.950000000000006,-4,-15.950000000000014],'rot':[0,90,0],'size':[8.999999999999996,29,24.000000000000004],'col':[0.3200000000000176,0.31250000000002,0.3400000000000225]},{'pos':[25.74999999999991,-4,0],'rot':[0,0,0],'size':[3,29,26],'col':[0.3200000000000167,0.3125000000000191,0.3400000000000216]},{'pos':[16.950000000000006,-1.3000000000000067,-29.16249999999986],'rot':[0,90,0],'size':[35.462499999999956,12.550000000000072,36.78750000000034],'col':[0.3200000000000185,0.31250000000002087,0.3400000000000234]},{'pos':[16.950000000000006,12.60000000000003,-13.04999999999994],'rot':[0,90,0],'size':[64.31250000000014,4.350000000000014,89.12500000000017],'col':[0.32000000000001805,0.31250000000002043,0.34000000000002295]},{'pos':[16.97499999999998,-1.3000000000000067,-21.962499999999864],'rot':[0,90,0],'size':[10.062499999999986,26.550000000000022,36.78750000000034],'col':[0.3200000000000183,0.3125000000000207,0.34000000000002323]},{'pos':[-13.949999999999974,-4,6.474999999999967],'rot':[0,90,0],'size':[3,29,26],'col':[0.3200000000000176,0.31250000000002,0.3400000000000225]},{'pos':[-13.899999999999896,-4,-18.46249999999999],'rot':[0,90,0],'size':[3,29,26],'col':[0.3200000000000185,0.31250000000002087,0.3400000000000234]},{'pos':[-28.799999999999933,-4,0],'rot':[0,0,0],'size':[6.650000000000003,29,36.000000000000036],'col':[0.3200000000000185,0.31250000000002087,0.3400000000000234]},{'pos':[-8.400000000000048,-4,-6.050000000000001],'rot':[0,0,0],'size':[14.59999999999998,29,6.05000000000013],'col':[0.3200000000000194,0.31250000000002176,0.3400000000000243]},{'pos':[-19.74023269453318,-3.0392051971434775,-7.996051407818207],'size':[36.54999999999974,2.0500000000000007,32.69999999999993],'col':[2,0,0],'rot':[0,0,0],'useTex':false,'special':'lava'},{'pos':[-8.250000000000046,-3.449999999999999,-13],'rot':[0,0,0],'size':[3,5.000000000000058,3],'col':[0.3200000000000198,0.3125000000000222,0.3400000000000247]},{'pos':[-15.75000000000002,-3.449999999999999,-13],'rot':[0,0,0],'size':[3,5.000000000000058,3],'col':[0.32000000000002027,0.31250000000002265,0.34000000000002517]},{'pos':[-22.800000000000036,-3.449999999999999,-6.149999999999987],'rot':[0,0,0],'size':[3,5.000000000000058,3],'col':[0.32000000000002116,0.31250000000002354,0.34000000000002606]},{'pos':[-22.800000000000036,-3.449999999999999,-12.450000000000044],'rot':[0,0,0],'size':[3,5.000000000000058,3],'col':[0.32000000000002204,0.3125000000000244,0.34000000000002695]},{'pos':[-22.800000000000036,-3.449999999999999,0.8499999999999716],'rot':[0,0,0],'size':[3,5.000000000000058,3],'col':[0.32000000000002293,0.3125000000000253,0.34000000000002784]},{'pos':[-15.000000000000092,-3.449999999999999,0.9499999999999716],'rot':[0,0,0],'size':[3,5.000000000000058,3],'col':[0.32000000000002293,0.3125000000000253,0.34000000000002784]},{'pos':[-4.650000000000062,-3.449999999999999,0.7499999999999714],'rot':[0,0,0],'size':[7.449999999999959,5.000000000000058,9.899999999999997],'col':[0.3200000000000238,0.3125000000000262,0.3400000000000287]},{'pos':[-4.3626661497424175,2.552284426778809,2.914499479724751],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000115],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-4.3626661497424175,2.552284426778809,2.914499479724751],'weapon':'bow'}},{'pos':[-3.8558599304367007,2.289459312032016,-0.7268909490935115],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000128],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-3.8558599304367007,2.289459312032016,-0.7268909490935115],'weapon':'bow'}},{'pos':[4.2822562592529785,-2.227052006833247,-8.840067248842766],'rot':[0,0,0],'size':[5.5500000000000025,14.450000000000054,5.8000000000000025],'col':[1.0000000000000115,0.18000000000000038,0.2400000000000011]},{'pos':[12.832256259252981,2.9729479931667515,-10.290067248842787],'rot':[0,0,163],'size':[7.9500000000000055,0.9500000000000013,4.199999999999997],'col':[1.000000000000012,0.18000000000000038,0.240000000000002]},{'pos':[22.982256259252928,-0.2770520068332464,-8.990067248842768],'rot':[78,122,270],'size':[13.150000000000079,0.9500000000000013,4.199999999999997],'col':[1.000000000000017,0.18000000000000038,0.2400000000000011]},{'pos':[17.082256259253043,-2.227052006833247,9.159932751157253],'rot':[0,0,0],'size':[1,14.450000000000054,11.549999999999986],'col':[1.0000000000000175,0.18000000000000038,0.2400000000000002]},{'pos':[20.824035403702027,-0.753129440855798,3.521479693998963],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'revolver','pos':[20.824035403702027,-0.753129440855798,3.521479693998963],'rot':[0,0,0]}},{'pos':[11.152372620541554,1.1868705591442013,5.48299374709236],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[11.152372620541554,1.1868705591442013,5.48299374709236],'weapon':'gun'}},{'pos':[5.8733908777773065,0.9235174413624754,4.243555163595705],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[5.8733908777773065,0.9235174413624754,4.243555163595705],'weapon':'shotgun'}},{'pos':[16.027499600287676,-0.19771751118014413,-5.445001492671045],'size':[0.75,1.325,0.75],'col':[1.0000000000000133,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[16.027499600287676,-0.19771751118014413,-5.445001492671045]}},{'pos':[4.9334554838636,7.796953360077876,-7.852457829766211],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[4.9334554838636,7.796953360077876,-7.852457829766211],'weapon':'boomer'}},{'pos':[19.306615633754046,1.485959055958764,-1.6265038791336586],'size':[0.5,0.5,0.5],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[19.306615633754046,1.485959055958764,-1.6265038791336586],'mass':1,'radius':0.5}},{'pos':[13.079649543911168,2.210426530154128,6.353974914703276],'size':[0.8000000000000003,0.8000000000000003,0.8000000000000003],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[13.079649543911168,2.210426530154128,6.353974914703276],'mass':1,'radius':0.8000000000000003}},{'pos':[24.088341674009328,-2.7474991666708246,-11.16179631741704],'rot':[0,0,0],'size':[0.17500000000000002,0.21250000000000005,0.1875000000000015],'col':[0.36000000000000054,0.1667493632394872,0],'useTex':false},{'pos':[24.088341674009328,-2.9099991666708163,-11.224296317417036],'rot':[0,0,0],'size':[0.17500000000000002,0.21250000000000005,0.0625],'col':[0.3600000000000019,0.1667493632394883,0],'useTex':false},{'pos':[24.088341674009328,-2.9099991666708163,-11.099296317417043],'rot':[0,0,0],'size':[0.17500000000000002,0.21250000000000005,0.0625],'col':[0.36000000000000143,0.16674936323948808,0],'useTex':false},{'pos':[24.05084167400933,-2.7474991666708246,-11.16179631741704],'rot':[0,0,0],'size':[0.15,0.0875,0.11250000000000145],'col':[0.07,0.3767493632394867,1],'useTex':false}]#[0,8,0]#[20.899999999999963,0,8.300000000000036]#[-4.649999999999999,0.4499999999999936,1.1000000000000099]#[20.9,-2,0]",
    "[{'pos':[0,-4,0],'size':[7,2,185],'rot':[0,0,0],'col':[0.30250000000000027,0.3375000000000022,0.32500000000000734]},{'pos':[-0.025991338815903674,1.1835566567127236,83.0323745183044],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'railgun','pos':[-0.025991338815903674,1.1835566567127236,83.0323745183044],'rot':[0,0,0]}},{'pos':[-0.02599133881590349,1.1835566567127236,85.79237451830433],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000016,0.4000000000000016,0.4000000000000016],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[-0.02599133881590349,1.1835566567127236,85.79237451830433],'rot':[0,0,0]}},{'pos':[-0.02599133881590534,1.0335566567127232,52.67237451830433],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.02599133881590534,1.0335566567127232,52.67237451830433],'weapon':'gun'}},{'pos':[-0.025991338815905936,1.0335566567127232,41.43237451830439],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815905936,1.0335566567127232,41.43237451830439],'weapon':'shotgun'}},{'pos':[-0.02599133881590666,1.0335566567127232,28.792374518304527],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.02599133881590666,1.0335566567127232,28.792374518304527],'weapon':'railgun'}},{'pos':[-0.025991338815907393,1.0335566567127232,15.712374518304532],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815907393,1.0335566567127232,15.712374518304532],'weapon':'boomer'}},{'pos':[-0.025991338815908115,1.0335566567127232,2.9623745183045327],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815908115,1.0335566567127232,2.9623745183045327],'weapon':'bow'}},{'pos':[-0.025991338815908874,1.0335566567127232,-10.007625481695474],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815908874,1.0335566567127232,-10.007625481695474],'weapon':'revolver'}},{'pos':[-0.025991338815909513,1.0335566567127232,-21.89762548169548],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815909513,1.0335566567127232,-21.89762548169548],'weapon':'sniper'}},{'pos':[-0.025991338815910234,1.0335566567127232,-35.01762548169547],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815910234,1.0335566567127232,-35.01762548169547],'weapon':'boomer'}},{'pos':[-0.025991338815910824,1.0335566567127232,-46.1676254816954],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815910824,1.0335566567127232,-46.1676254816954],'weapon':'shotgun'}},{'pos':[-0.025991338815911428,1.0335566567127232,-57.07762548169532],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815911428,1.0335566567127232,-57.07762548169532],'weapon':'revolver'}},{'pos':[-0.025991338815911955,1.0335566567127232,-66.62762548169525],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.025991338815911955,1.0335566567127232,-66.62762548169525],'weapon':'bow'}},{'pos':[0,-1.074792611426987,-1.1830504882826376],'size':[7,5.300000000000013,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0,-0.7547926114269871,-29.859115892762446],'size':[7,4.74999999999999,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0,-0.9647926114269854,-51.34921774269959],'size':[7,8.2,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0,-0.384929935182801,-73.21374712359068],'size':[7,6.749999999999992,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'}]#[0,8,0]#[0,0,88.80000000000061]#[0,-0.9000000000000002,-86.20000000000064]#[0,-2,78]",
    "[{'pos':[-8,-4,8],'size':[35,2,35],'rot':[0,0,0],'col':[0.28000000000001024,0.28000000000001024,0.2800000000000147]},{'pos':[-19.249999999999986,0.6000000000000013,8],'rot':[0,0,0],'size':[12.50000000000022,13,22.599999999999994],'col':[1.0000000000000364,0.5000000000000253,0]},{'pos':[-5.100000000000031,-4,21.349999999999955],'rot':[0,0,0],'size':[2.000000000000239,5.600000000000012,6.3999999999999915],'col':[0.2800000000000067,0.5400000000000182,1.0000000000000164],'useTex':false},{'pos':[-5.100986970464672,2.6600015853408285,22.422674513881333],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'shotgun','pos':[-5.100986970464672,2.6600015853408285,22.422674513881333],'rot':[0,0,0]}},{'pos':[-4.810293176578748,2.6600015853408285,20.722037762307245],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'boomer','pos':[0,2.6600015853408285,15.722037762307245],'rot':[0,0,0]}},{'pos':[-7.810293176578748,2.6600015853408285,20.722037762307245],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'reverse','pos':[-2,2.6600015853408285,15.722037762307245],'rot':[0,0,0]}},{'pos':[-0.810293176578748,2.6600015853408285,20.722037762307245],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'lantern','pos':[0,2.6600015853408285,12.722037762307245],'rot':[0,0,0]}},{'pos':[-5.836416501840953,2.6600015853408285,21.556897305575905],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[-5.836416501840953,2.6600015853408285,21.556897305575905],'rot':[0,0,0]}},{'pos':[-5.526107428196202,2.6616635339372507,20.541926572973793],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'bow','pos':[-5.526107428196202,2.6616635339372507,20.541926572973793],'rot':[0,0,0]}},{'pos':[-5.036651203346299,2.6602913988501706,19.688322650433854],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'railgun','pos':[-5.036651203346299,2.6602913988501706,19.688322650433854],'rot':[0,0,0]}},{'pos':[-5.189740422005063,2.6600015853408285,18.784785586593433],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'candycane','pos':[-5.189740422005063,2.6600015853408285,18.784785586593433],'rot':[0,0,0]}},{'pos':[-4.500851094231448,2.6616635339372507,19.189425077269508],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000513,0.40000000000000513,0.40000000000000513],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[-4.500851094231448,2.6616635339372507,19.189425077269508],'rot':[0,0,0]}},{'pos':[-4.957238249380584,0.42108117905321674,23.327376584778726],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'revolver','pos':[-4.957238249380584,0.42108117905321674,23.327376584778726],'rot':[0,0,0]}},{'pos':[-5.498660393759739,0.4200015853408283,23.957021364841513],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'sniper','pos':[-5.498660393759739,0.4200015853408283,23.957021364841513],'rot':[0,0,0]}},{'pos':[17.749999999999996,4.200000000000001,-1.999999999999999],'rot':[0,0,0],'size':[2,17.699999999999985,24.999999999999986],'col':[1.0000000000000242,0.5000000000000218,0]},{'pos':[-8,-6.800000000000004,-35.84999999999997],'rot':[0,0,0],'size':[35,8,35],'col':[0.28000000000001113,0.28000000000001113,0.28000000000001557]},{'pos':[41.50000000000005,-6.800000000000004,-35.84999999999997],'rot':[0,45,0],'size':[35,8,35],'col':[0.280000000000012,0.280000000000012,0.28000000000001646]},{'pos':[41.50000000000005,18.100000000000033,-35.84999999999997],'rot':[0,0,0],'size':[5,55.95000000000026,5],'col':[1.0000000000000044,0.5600000000000018,0]},{'pos':[41.50000000000005,18.100000000000033,-35.84999999999997],'rot':[0,0,0],'size':[35.14999999999995,1.6500000000000004,5],'col':[1.0000000000000089,0.5600000000000038,0]},{'pos':[41.50000000000005,18.100000000000033,-35.84999999999997],'rot':[0,90,0],'size':[35.14999999999995,1.6500000000000004,5],'col':[1.0000000000000133,0.5600000000000054,0]},{'pos':[41.50000000000005,33.70000000000004,-35.84999999999997],'rot':[0,45,0],'size':[35.14999999999995,1.6500000000000004,5],'col':[1.0000000000000133,0.5600000000000054,0]},{'pos':[41.50000000000005,33.70000000000004,-35.84999999999997],'rot':[0,135,0],'size':[35.14999999999995,1.6500000000000004,5],'col':[1.0000000000000178,0.5600000000000072,0]},{'pos':[25.193734589788544,-2.0522189437896174,-35.87706215129459],'rot':[0,0,0],'size':[1.5000000000000004,2.9250000000000007,1.4999999999999996],'col':[0.349289176425986,0.6873166408428377,1],'useTex':false},{'pos':[25.25330651023548,2.7600015853408353,-35.835701253331706],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[25.25330651023548,2.7600015853408353,-35.835701253331706],'rot':[0,0,0]}},{'pos':[-19.249999999999986,0.20000000000000034,-38.250000000000014],'rot':[0,22,0],'size':[12.50000000000022,13,22.599999999999994],'col':[1.000000000000024,0.50000000000002,0]},{'pos':[-19.249999999999986,6.0000000000000036,-38.250000000000014],'rot':[0,134,0],'size':[12.50000000000022,18.39999999999998,4.300000000000042],'col':[1.0000000000000284,0.5000000000000218,0]},{'pos':[-18.19572733887259,12.27000158534075,-47.136652178787344],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-18.19572733887259,12.27000158534075,-47.136652178787344],'weapon':'bow'}},{'pos':[11.349999999999998,-17.599999999999973,-100.75000000000082],'rot':[0,0,0],'size':[15,2.0000000000000018,15],'col':[0.2800000000000117,0.2800000000000117,0.2800000000000161]},{'pos':[31.799999999999926,12.850000000000051,-80.20000000000063],'rot':[0,129,0],'size':[35.14999999999995,1.6500000000000004,5],'col':[1.0000000000000178,0.5600000000000072,0]},{'pos':[-18.84999999999998,1.1125000000000014,21.149999999999977],'rot':[0,0,141.25],'size':[17.750000000000217,1,4.000000000000045],'col':[1.0000000000000364,0.5000000000000253,0]},{'pos':[-21.627944285195564,8.090001585340836,13.782626860467815],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-18.6368766048464,8.090001585340836,14.056295707813472],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-15.682063583311002,8.090001585340836,13.011508644453224],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-15.697213520186097,8.090001585340836,9.981546519374314],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-15.711363461227851,8.090001585340836,7.1515818943006115],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-15.727663393311285,8.090001585340836,3.891622644215719],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-18.48762889338316,8.090001585340836,3.905422586715792],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-21.577590268463645,8.090001585340836,3.92087252234087],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-21.56379032596356,8.090001585340836,6.68083802241274],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-21.546340398671784,8.090001585340836,10.170794397503624],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-18.196382273584554,8.090001585340836,10.154044467295186],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-18.212232207542986,8.090001585340836,6.984084092212633],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-15.569215553515079,8.090001585340836,-0.4192234771465486],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-18.569178053593216,8.090001585340836,-0.40422353964647],'size':[1,1,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-24.475971916840223,6.939667196919409,-43.049805467416654],'rot':[0,0,0],'size':[0.17500000000000002,0.22500000000000153,0.1875000000000015],'col':[1.0000000000000089,0,0],'useTex':false},{'pos':[-24.52499999999997,6.852167196919403,-43.049805467416654],'rot':[0,0,0],'size':[0.0625,0.25000000000000155,0.1875000000000015],'col':[1.0000000000000133,0,0],'useTex':false},{'pos':[-24.424999999999976,6.852167196919403,-43.049805467416654],'rot':[0,0,0],'size':[0.0625,0.25000000000000155,0.1875000000000015],'col':[1.0000000000000133,0,0],'useTex':false},{'pos':[-24.475971916840223,6.939667196919409,-43.074805467416674],'rot':[0,0,0],'size':[0.13749999999999998,0.07500000000000145,0.1875000000000015],'col':[0,0.7600000000000001,1],'useTex':false}]#[-8,11.400000000000087,-21.599999999999962]#[0,0,22.5]#[11.699999999999957,-15.65000000000001,-101.20000000000084]#[-5,-2,12]",
    "[{'pos':[0,-4,18.799999999999997],'size':[8,2,8],'rot':[0,0,0],'col':[0.3000000000000047,0.33000000000000673,0.3200000000000087]},{'pos':[5,3,18.799999999999997],'rot':[0,0,0],'size':[2,2,8],'col':[0.3000000000000065,0.3300000000000085,0.3200000000000105]},{'pos':[-5,3,18.799999999999997],'rot':[0,0,0],'size':[2,2,8],'col':[0.3000000000000065,0.3300000000000085,0.3200000000000105]},{'pos':[0,3,23.699999999999996],'rot':[0,0,0],'size':[8,2,2],'col':[0.30000000000000737,0.3300000000000094,0.3200000000000114]},{'pos':[0,3,14],'rot':[0,0,0],'size':[8,2,2],'col':[0.30000000000000826,0.3300000000000103,0.3200000000000123]},{'pos':[0.03987846977492959,0.23000158534082615,17.148417345124948],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000048,0.4000000000000048,0.4000000000000048],'useTex':false,'partInfo':{'instance':'weapon','type':'shotgun','pos':[0.03987846977492959,0.23000158534082615,17.148417345124948],'rot':[0,0,0]}},{'pos':[0,3,2.7500000000000657],'rot':[0,0,0],'size':[14.499999999999982,2,14.099999999999985],'col':[0.30000000000000915,0.3300000000000112,0.32000000000001316]},{'pos':[5.603911902919139,9.920001585340842,-1.7577659478394547],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[5.603911902919139,9.920001585340842,-1.7577659478394547],'weapon':'revolver'}},{'pos':[-4.680786115717603,9.920001585340842,-1.4463391258581497],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-4.680786115717603,9.920001585340842,-1.4463391258581497],'weapon':'boomer'}},{'pos':[0.3951703273489267,8.36000158534084,7.6518323700285045],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'bow','pos':[0.3951703273489267,8.36000158534084,7.6518323700285045],'rot':[0,0,0]}},{'pos':[0,3,-16.949999999999918],'rot':[0,0,0],'size':[14.499999999999982,2,14.099999999999985],'col':[0.3000000000000096,0.3300000000000116,0.3200000000000136]},{'pos':[-2.8976090274125554,10.680001585340847,3.336434774660831],'rot':[0,0,0],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[-2.8976090274125554,10.680001585340847,3.336434774660831],'rot':[0,0,0],'size':[1,1,1]}},{'pos':[4.004979854286993,10.680001585340847,3.2302899196854105],'rot':[0,0,0],'size':[1.6874999999999993,1.7125000000000004,1.7000000000000006],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[4.004979854286993,10.680001585340847,3.2302899196854105],'rot':[0,0,0],'size':[1,1,1]}},{'pos':[0,7.440083993275641,-10.447363880523916],'size':[14.537499999999998,9.04999999999993,1],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-3.4126590244281583,7.020001585340837,-21.235231160213562],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-3.4126590244281583,7.020001585340837,-21.235231160213562],'weapon':'shotgun'}},{'pos':[-0.8530431988749131,7.020001585340837,-22.568110309115458],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-0.8530431988749131,7.020001585340837,-22.568110309115458],'weapon':'railgun'}},{'pos':[1.557948177004477,7.020001585340837,-21.040131060095643],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[1.557948177004477,7.020001585340837,-21.040131060095643],'weapon':'sniper'}},{'pos':[-0.7938493968578471,7.020001585340837,-20.96908057399395],'size':[0.75,1.325,0.75],'col':[1.0000000000000044,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-0.7938493968578471,7.020001585340837,-20.96908057399395]}},{'pos':[0,3,-33],'rot':[0,0,0],'size':[5,2,5],'col':[0.3000000000000105,0.3300000000000125,0.3200000000000145]}]#[0,8,0]#[0,0,20]#[0,4.8000000000000025,-33.24999999999992]#[0,10,7]",
    "[{'pos':[0,-4,0],'size':[75,2,75],'rot':[0,0,0],'col':[0.33000000000000096,0.38000000000000367,0.39000000000000523]},{'pos':[-7,-4,0],'rot':[0,0,0],'size':[3,23,75],'col':[0.3300000000000036,0.38000000000000544,0.3900000000000079]},{'pos':[7,-4,0],'rot':[0,0,0],'size':[3,23,75],'col':[0.33000000000000496,0.3800000000000068,0.39000000000000923]},{'pos':[7,-4,25.64999999999996],'rot':[0,90,0],'size':[3,23,75],'col':[0.33000000000000584,0.38000000000000766,0.3900000000000101]},{'pos':[7,-4,-23.29999999999994],'rot':[0,90,0],'size':[3,23,75],'col':[0.33000000000000673,0.38000000000000855,0.390000000000011]},{'pos':[7,-4,14.349999999999994],'rot':[0,90,0],'size':[3,23,15.349999999999483],'col':[0.3300000000000076,0.38000000000000944,0.3900000000000119]},{'pos':[7,-4,-2.399999999999992],'rot':[0,90,0],'size':[3,23,15.349999999999483],'col':[0.3300000000000085,0.38000000000001033,0.3900000000000128]},{'pos':[-7,-4,4.750000000000009],'rot':[0,90,0],'size':[3,23,15.349999999999483],'col':[0.3300000000000094,0.3800000000000112,0.39000000000001367]},{'pos':[-7,-4,-12.299999999999947],'rot':[0,90,0],'size':[3,23,15.349999999999483],'col':[0.3300000000000103,0.3800000000000121,0.39000000000001456]},{'pos':[0.512110045628538,3.0700015853407976,9.774545980417594],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000128],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[0.512110045628538,3.0700015853407976,9.774545980417594],'weapon':'gun'}},{'pos':[3.094843053907341,2.9200015853407972,2.0967083806798126],'size':[0.75,1.325,0.75],'col':[0.09999999999999976,0.30000000000000343,0.9000000000000139],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[3.094843053907341,2.9200015853407972,2.0967083806798126],'weapon':'bow'}},{'pos':[-2.4123852680601168,3.070001585340794,-7.684014302727561],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-2.4123852680601168,3.070001585340794,-7.684014302727561],'weapon':'shotgun'}},{'pos':[2.550812234688034,3.2400015853408046,-7.349842866613547],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[2.550812234688034,3.2400015853408046,-7.349842866613547],'weapon':'railgun'}},{'pos':[0,8.35000000000001,0],'rot':[0,0,0],'size':[75,2,75],'col':[0.33000000000000185,0.38000000000000456,0.3900000000000061]},{'pos':[0,0,20],'rot':[0,0,0],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[0,0,20],'rot':[0,0,0],'size':[1,1,1]}},{'pos':[3,0,20],'size':[1.15,1.15,1.15],'col':[0.09999999999999987,0.30000000000001625,0.9000000000000508],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[3,0,20],'mass':1,'radius':0.5}},{'pos':[-2,0,20],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000057,0.4000000000000057,0.4000000000000057],'useTex':false,'partInfo':{'instance':'weapon','type':'reverse','pos':[-2,0,20],'rot':[0,0,0]}}]#[0,8,0]#[0,0,23]#[0,-1.6500000000000008,-18.79999999999993]#[-4,-2,12]",
    "[{'pos':[0,-24,0],'size':[75,2,121.45000000000066],'rot':[0,0,0],'col':[0.3300000000000156,0.3100000000000178,0.3200000000000158]},{'pos':[20,-4,0],'rot':[0,0,0],'size':[4,40,75],'col':[0.3300000000000254,0.3100000000000276,0.3200000000000247]},{'pos':[-20,-4,0],'rot':[0,0,0],'size':[4,40,75],'col':[0.3300000000000254,0.3100000000000276,0.3200000000000247]},{'pos':[0,3.512499999999985,20],'rot':[0,90,0],'size':[4,25.24999999999995,75],'col':[0.3300000000000263,0.3100000000000285,0.3200000000000256]},{'pos':[0,-4,-20],'rot':[0,90,0],'size':[4,40,75],'col':[0.3300000000000263,0.3100000000000285,0.3200000000000256]},{'pos':[45,-21.387499999999875,20],'rot':[0,90,0],'size':[4,25.24999999999995,75],'col':[0.33000000000002716,0.31000000000002936,0.3200000000000265]},{'pos':[-16.399999999999874,-21.387499999999875,38.65000000000002],'rot':[0,90,0],'size':[4,74.65000000000043,75.2],'col':[0.33000000000002805,0.31000000000003025,0.3200000000000274]},{'pos':[0,-25.09999999999994,0],'rot':[0,0,0],'size':[6.650000000000002,24.712499999999928,5.400000000000002],'col':[0.49266848198520885,0.24000000000001498,0],'useTex':false},{'pos':[3.5000000000000004,-25.09999999999994,1.850000000000004],'rot':[156,49,0],'size':[4.050000000000001,16.599999999999962,3.2499999999999996],'col':[0.49266848198520885,0.24000000000001587,0],'useTex':false},{'pos':[-3.4500000000000033,-25.09999999999994,1.850000000000004],'rot':[156,316,0],'size':[4.050000000000001,16.599999999999962,3.2499999999999996],'col':[0.4926684819852085,0.2400000000000153,0],'useTex':false},{'pos':[-0.5000000000000031,-25.09999999999994,-4.350000000000001],'rot':[156,203,0],'size':[4.050000000000001,16.599999999999962,3.2499999999999996],'col':[0.4926684819852094,0.2400000000000153,0],'useTex':false},{'pos':[0,-12.549999999999985,0],'rot':[0,64,0],'size':[3.6499999999999995,26.99999999999994,4.499999999999997],'col':[0.49266848198520496,0.24000000000001087,0],'useTex':false},{'pos':[-0.5000000000000001,-3.6999999999999886,1.6000000000000003],'rot':[46,0,0],'size':[0.9499999999999982,9.3,1.2],'col':[0.49266848198520496,0.24000000000000998,0],'useTex':false},{'pos':[-0.5000000000000001,3.3000000000000136,-0.09999999999999924],'rot':[0,0,0],'size':[2.9000000000000137,9.3,2.4000000000000044],'col':[0.4926684819852032,0.24000000000000732,0],'useTex':false},{'pos':[3.3000000000000007,-9.749999999999991,1.6000000000000003],'rot':[46,89,0],'size':[0.9499999999999982,9.3,1.2],'col':[0.4926684819852041,0.2400000000000082,0],'useTex':false},{'pos':[-0.5000000000000001,9.9,-0.09999999999999924],'rot':[0,78,0],'size':[12.300000000000002,3.8000000000000025,13.949999999999989],'col':[1.0000000000000338,0.4400000000000155,0.8100000000000271],'useTex':false},{'pos':[-0.5000000000000001,9.9,3.600000000000002],'rot':[3,144,32],'size':[12.300000000000002,3.8000000000000025,13.949999999999989],'col':[1.000000000000038,0.44000000000001727,0.8100000000000322],'useTex':false},{'pos':[-6.700000000000006,9.9,8.550000000000008],'rot':[3,214,0],'size':[12.300000000000002,3.8000000000000025,13.949999999999989],'col':[1.0000000000000435,0.44000000000001815,0.810000000000036],'useTex':false},{'pos':[2.4499999999999966,8.15,-9.299999999999995],'rot':[24,147,0],'size':[12.300000000000002,3.8000000000000025,13.949999999999989],'col':[1.0000000000000506,0.44000000000001904,0.8100000000000422],'useTex':false},{'pos':[-9.150000000000004,8.15,-8.149999999999979],'rot':[24,206,0],'size':[12.300000000000002,3.8000000000000025,13.949999999999989],'col':[1.0000000000000506,0.44000000000001993,0.8100000000000422],'useTex':false},{'pos':[-9.150000000000004,8.15,0.5000000000000232],'rot':[24,284,0],'size':[12.300000000000002,8.649999999999999,13.949999999999989],'col':[1.0000000000000566,0.4400000000000208,0.8100000000000465],'useTex':false},{'pos':[6.6000000000000005,8.15,8.450000000000026],'rot':[162,232,0],'size':[12.300000000000002,3.499999999999994,13.949999999999989],'col':[1.0000000000000677,0.4400000000000217,0.8100000000000549],'useTex':false},{'pos':[8.700000000000005,10.199999999999994,-0.8999999999999806],'rot':[162,285,0],'size':[12.300000000000002,5.699999999999996,13.949999999999989],'col':[1.0000000000000693,0.4400000000000235,0.8100000000000565],'useTex':false},{'pos':[5.500000000000001,-7.250000000000009,-0.8999999999999806],'rot':[162,285,0],'size':[7.500000000000017,2.499999999999993,8.000000000000004],'col':[1.000000000000076,0.44000000000002437,0.8100000000000622],'useTex':false},{'pos':[-0.5500000000000023,0.849999999999997,2.800000000000018],'rot':[31,332,0],'size':[7.500000000000017,2.499999999999993,8.000000000000004],'col':[1.0000000000000788,0.44000000000002437,0.8100000000000651],'useTex':false},{'pos':[0,5.227715573221179,0],'size':[28.649999999999938,2.2499999999999996,33.14999999999992],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'particleSystem','particleSystemData':{'pos':[0,-8.227715573221179,0],'size':[28.649999999999938,20.25,33.14999999999992],'minVelX':-0.06249999999999993,'maxVelX':0.04999999999999988,'minVelY':0,'maxVelY':0.003,'minVelZ':-0.04999999999999993,'maxVelZ':0.049999999999999864,'minR':1,'maxR':1,'minG':0.4620000000000012,'maxG':0.4119999999999995,'minB':1,'maxB':1,'minLife':162.24999999999935,'maxLife':200.79999999999742,'grav':-0.01125,'minSize':34,'maxSize':131.5,'productionRate':3,'batchAmount':2}},{'pos':[-45,-21.387499999999875,20],'rot':[0,90,0],'size':[4,25.24999999999995,75],'col':[0.33000000000002716,0.31000000000002936,0.3200000000000265]},{'pos':[-17.149999999999867,-5.78749999999992,30.69999999999993],'rot':[0,90,0],'size':[22.449999999999996,6.6749999999999154,77.30000000000001],'col':[0.33000000000002805,0.31000000000003025,0.3200000000000274]},{'pos':[-12.495776282116212,-21.06579621664705,16.670326534600118],'rot':[0,0,149],'size':[16.799999999999972,1,4.799999999999995],'col':[0.05999999999999983,0.4661395560707453,0.06746818945970179]},{'pos':[-16.695776282116224,-15.565796216647044,2.370326534600169],'rot':[32,0,0],'size':[4,1,4],'col':[0.05999999999999983,0.4661395560707453,0.06746818945970134]},{'pos':[-16.695776282116224,-17.76579621664706,9.97032653460015],'rot':[0,0,0],'size':[4,1,4],'col':[0.05999999999999983,0.4661395560707444,0.06746818945970134]},{'pos':[-15.737265911381852,-13.129998414659177,9.995225596393928],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-15.737265911381852,-13.129998414659177,9.995225596393928],'weapon':'bow'}},{'pos':[-16.695776282116224,-13.96579621664705,-3.479673465399832],'rot':[0,0,0],'size':[4,1,4],'col':[0.05999999999999983,0.4661395560707462,0.06746818945970134]},{'pos':[-16.695776282116224,-12.165796216647056,-17.879673465399787],'rot':[0,45,0],'size':[14.449999999999974,1,9.35],'col':[0.05999999999999973,0.46613955607074653,0.06746818945970125]},{'pos':[-16.235329577445732,-6.789998414659146,-15.759052434751098],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-16.235329577445732,-6.789998414659146,-15.759052434751098],'weapon':'gun'}},{'pos':[-15.991438518448916,-8.669998414659144,-3.518369869421946],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-15.991438518448916,-8.669998414659144,-3.518369869421946],'weapon':'revolver'}},{'pos':[10.287981735750625,-17.919998414659176,2.989577543647464],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[10.287981735750625,-17.919998414659176,2.989577543647464],'weapon':'sniper'}},{'pos':[1.3042237178837504,-9.615796216647063,-17.879673465399787],'rot':[0,0,12],'size':[14.449999999999974,1,9.35],'col':[0.05999999999999973,0.4661395560707474,0.06746818945970125]},{'pos':[15.854223717883752,-7.665796216647052,-16.379673465399765],'rot':[0,0,0],'size':[5,1,5],'col':[0.05999999999999973,0.4661395560707483,0.06746818945970125]},{'pos':[0.7247409273338992,-18.21747493302025,22.802502620713025],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'ball','pos':[0.7247409273338992,-18.21747493302025,22.802502620713025],'rot':[0,0,0]}},{'pos':[-2.724740927333899,-18.21747493302025,22.802502620713025],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'wand','pos':[-2.724740927333899,-18.21747493302025,22.802502620713025],'rot':[0,0,0]}},{'pos':[12.689062912656146,-17.282484668939027,6.556833149485131],'size':[0.75,1.325,0.75],'col':[1.0000000000000044,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[12.689062912656146,-17.282484668939027,6.556833149485131]}},{'pos':[-7.244953027089684,-15.04316748057946,2.1672705414981506],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'boomer','pos':[-7.244953027089684,-15.04316748057946,2.1672705414981506],'rot':[0,0,0]}},{'pos':[15.513991031845572,-3.039998414659163,-15.607217809787462],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[15.513991031845572,-3.039998414659163,-15.607217809787462],'weapon':'railgun'}},{'pos':[14.175763656000525,-17.899708601149857,9.138709188627],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[14.175763656000525,-17.899708601149857,9.138709188627],'weapon':'bow'}},{'pos':[6.904255663098079,-19.442125774763383,11.316185027450807],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'reverse','pos':[6.904255663098079,-19.442125774763383,11.316185027450807],'rot':[0,0,0]}},{'pos':[2.1526774321388586,-12.587190662368002,1.3940190478732974],'rot':[0,0,0],'size':[0.12500000000000144,0.1750000000000015,0.13750000000000145],'col':[0.16694238942749484,1.0000000000000044,0.04595326121440309],'useTex':false},{'pos':[2.190177432138859,-12.637190662367999,1.3940190478732974],'rot':[0,0,0],'size':[0.05,0.25000000000000155,0.13750000000000145],'col':[0.16694238942749484,1.0000000000000089,0.04595326121440331],'useTex':false},{'pos':[2.11517743213886,-12.637190662367999,1.3940190478732974],'rot':[0,0,0],'size':[0.05,0.25000000000000155,0.13750000000000145],'col':[0.16694238942749484,1.0000000000000089,0.04595326121440331],'useTex':false},{'pos':[2.1526774321388586,-12.587190662368002,1.4190190478732974],'rot':[0,0,0],'size':[0.10000000000000145,0.05000000000000146,0.13750000000000145],'col':[0,0.6300000000000086,1],'useTex':false}]#[5.250000000000002,-1.3000000000000045,0]#[0,-19.29999999999997,29.199999999999967]#[6.850000000000007,-4.75,-1.8500000000000039]#[6,-21,32]",
    "[{'pos':[0,-4,0],'size':[21.89999999999961,2,23.699999999999413],'rot':[0,22,0],'col':[0.5300000000000158,0.510000000000018,0.3800000000000121],'useTex':false},{'pos':[0,-2.8000000000000007,0],'rot':[0,68,0],'size':[10.699999999999644,17.800000000000026,12.999999999999439],'col':[0.5300000000000451,0.5100000000000473,0.3800000000000263],'useTex':false},{'pos':[5.900000000000003,0.7999999999999976,8.150000000000006],'rot':[0,0,0],'size':[10.699999999999644,17.800000000000026,12.999999999999439],'col':[0.5300000000000362,0.5100000000000384,0.3800000000000219],'useTex':false},{'pos':[2.549999999999999,0.7999999999999976,-5.800000000000002],'rot':[0,52,0],'size':[10.599999999999643,45.70000000000016,20.84999999999941],'col':[0.530000000000036,0.5100000000000382,0.3800000000000219],'useTex':false},{'pos':[-4.750000000000004,0.6999999999999975,-8.800000000000008],'rot':[0,105,0],'size':[10.599999999999643,52.250000000000284,20.84999999999941],'col':[0.530000000000038,0.5100000000000402,0.38000000000002276],'useTex':false},{'pos':[12.04999999999999,0.7999999999999976,4.400000000000001],'rot':[0,39,0],'size':[10.699999999999644,28.700000000000063,12.999999999999439],'col':[0.5300000000000362,0.5100000000000384,0.3800000000000219],'useTex':false},{'pos':[12.04999999999999,0.7999999999999976,4.400000000000001],'rot':[0,16,0],'size':[10.699999999999644,28.10000000000001,12.999999999999439],'col':[0.5300000000000362,0.5100000000000384,0.3800000000000219],'useTex':false},{'pos':[2.190739457392678,11.195253527615524,-4.313733823458292],'size':[9.100000000000014,25.049999999999944,3.1000000000000023],'col':[1.9999999999999998,0,0],'rot':[0,53,0],'useTex':false,'special':'lava'},{'pos':[-1.743438269521831,0.45029139885019315,0.9352917525998801],'size':[9.249999999999996,11.949999999999992,3.0500000000000025],'col':[2,0,0],'rot':[0,53.25,0],'useTex':false,'special':'lava'},{'pos':[4.500000000000007,0.6999999999999975,-7.450000000000015],'rot':[0,105,0],'size':[7.2999999999996525,52.250000000000284,8.95000000000003],'col':[0.530000000000038,0.5100000000000402,0.38000000000002276],'useTex':false},{'pos':[4.65680195294393,26.860001585340836,-7.8495714948946995],'size':[1,1,1],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'particleSystem','particleSystemData':{'pos':[4.65680195294393,26.860001585340836,-7.8495714948946995],'size':[1,1,1],'minVelX':-0.44999999999999996,'maxVelX':0.49999999999999994,'minVelY':1.7499999999999996,'maxVelY':1.2499999999999867,'minVelZ':-0.49999999999999994,'maxVelZ':0.49999999999999994,'minR':0.9625000000000014,'maxR':1,'minG':0,'maxG':0.7390000000000001,'minB':0,'maxB':0,'minLife':56.900000000000496,'maxLife':57.750000000000355,'grav':-0.16150000000000012,'minSize':19.5,'maxSize':157,'productionRate':1,'batchAmount':1}},{'pos':[4.2406445099148184,22.030001585340763,-7.871505748744195],'size':[7.5000000000000036,11.000000000000007,11.399999999999991],'col':[2,0,0],'rot':[0,123,0],'useTex':false,'special':'lava'},{'pos':[11.366688697497791,9.900001585340956,7.542049690908487],'size':[7.849999999999997,11.199999999999996,13.49999999999999],'col':[2,0,0],'rot':[0,13,0],'useTex':false,'special':'lava'},{'pos':[18.74999999999997,0.7999999999999976,5.499999999999997],'rot':[0,19,0],'size':[11.299999999999642,40.80000000000004,21.249999999999417],'col':[0.5300000000000362,0.5100000000000384,0.3800000000000219],'useTex':false},{'pos':[-9.0418345330338,3.319190166422249,2.114460767117259],'rot':[40,0,0],'size':[5.450000000000003,1,21.95],'col':[0.7771871693573988,0.3793590392104942,0],'useTex':true},{'pos':[-0.8418345330337984,16.66919016642223,-1.885539232882748],'rot':[93,65,93],'size':[9.5,1,7.300000000000033],'col':[0.7771871693574011,0.37935903921049485,0],'useTex':true},{'pos':[4.458165466966204,12.719190166422248,5.414460767117267],'rot':[44,332,0],'size':[2.2999999999999994,1,14.650000000000011],'col':[0.777187169357408,0.3793590392104964,0],'useTex':true},{'pos':[8.358165466966197,17.319190166422214,6.464460767117263],'rot':[13,311,0],'size':[3.650000000000004,1,4.950000000000025],'col':[0.7771871693574124,0.3793590392104982,0],'useTex':true},{'pos':[10.008165466966181,18.46919016642223,3.364460767117274],'rot':[38,311,0],'size':[4.849999999999998,1,5.650000000000029],'col':[0.7500000000000144,0.3793590392104982,0],'useTex':true},{'pos':[-3.991834533033822,24.669190166422187,-4.43553923288272],'rot':[0,0,135],'size':[4.499999999999999,1,10.300000000000026],'col':[0.7500000000000127,0.3793590392104973,0],'useTex':true},{'pos':[-6.630591279973665,9.710001585340915,1.2635537914282646],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000746,0.40000000000000746,0.40000000000000746],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[-6.630591279973665,9.710001585340915,1.2635537914282646],'rot':[0,0,0]}},{'pos':[5.660257281088903,-2.7963626454302233,-11.991369476660727],'rot':[0,0,0],'size':[0.15,0.2750000000000016,0.15000000000000147],'col':[0,0,0],'useTex':false},{'pos':[5.610257281088902,-2.9338626454302252,-11.991369476660727],'rot':[0,0,0],'size':[0.0625,0.2750000000000016,0.15000000000000147],'col':[0,0,0],'useTex':false},{'pos':[5.710257281088904,-2.9338626454302252,-11.991369476660727],'rot':[0,0,0],'size':[0.0625,0.2750000000000016,0.15000000000000147],'col':[0,0,0],'useTex':false},{'pos':[5.660257281088903,-2.7463626454302226,-12.053869476660724],'rot':[0,0,0],'size':[0.075,0.05000000000000146,0.15000000000000147],'col':[0,0.5599999999999996,1],'useTex':false}]#[0,25,0]#[-3.7500000000000013,0,11.750000000000004]#[-10.79999999999999,27.549999999999926,-5.750000000000014]#[0,-2,7]",
    "[{'pos':[0,-4,0],'size':[75,2,75],'rot':[0,0,0],'col':[0.21000000000000055,0.14999999999999974,0.13999999999999996],'useTex':false},{'pos':[-36.06371045520328,12.01911376558548,-0.046193120139734756],'rot':[0,0,0],'size':[2.9999999999999973,30.00000000000029,74.99999999999788],'col':[0.20554457517389402,0.19757531543432605,0.20384677241899318]},{'pos':[-36.06371045520328,12.01911376558548,-0.046193120139734756],'rot':[0,0,0],'size':[2.9999999999999973,30.00000000000029,74.99999999999788],'col':[0.20554457517389135,0.19757531543432605,0.2038467724189914]},{'pos':[-0.006078874434404566,12.005568573104702,-35.98619825614897],'rot':[0,0,0],'size':[75.04999999999788,30.00000000000029,2.9999999999999973],'col':[0.19999999999999996,0.19977471580681772,0.19639815858888432]},{'pos':[0.5564515346594635,11.992645075960553,35.99310355764257],'rot':[0,0,0],'size':[73.99999999999794,30.00000000000029,2.9999999999999973],'col':[0.20781917801626726,0.20129395608071565,0.20244114573056038]},{'pos':[36.00173903625711,11.96520738857305,0.5474729225587205],'rot':[0,0,0],'size':[2.9999999999999973,30.00000000000029,73.99999999999794],'col':[0.19610382233618906,0.20453756413396906,0.19676892286796366]},{'pos':[29.363571146402823,2.010238874475794,-29.532220502464995],'rot':[0,0,0],'size':[10.000000000000007,10.000000000000007,10.050000000000008],'col':[0.40000000000002434,0,0]},{'pos':[16.92406120020547,-2.7697405348276165,-30.366870328414425],'rot':[0,0,28],'size':[22.400000000000183,10.300000000000011,7.99999999999998],'col':[0.40592978729451623,0,0]},{'pos':[-29.510755737136062,6.951829286901384,29.418790078960416],'rot':[0,0,0],'size':[10.000000000000007,20.00000000000015,10.000000000000007],'col':[0.3969308656536057,0,0]},{'pos':[-16.99823472752454,-1.6338458493696635,30.603894030347654],'rot':[0,0,52],'size':[20.00000000000015,34.85000000000016,7.99999999999998],'col':[0.40036798064823476,0,0]},{'pos':[-29.645256208052388,17.057315007182932,25.836018174649436],'rot':[0,0,0],'size':[2.9999999999999973,2.000000000000001,1.4500000000000004],'col':[0.7100000000000275,0.21645173932634698,0.2049042057152981],'useTex':false},{'pos':[-28.91841549467348,19.140787185523624,25.78097246724595],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000199,0.4000000000000199,0.4000000000000199],'useTex':false,'partInfo':{'instance':'weapon','type':'lantern','pos':[-28.91841549467348,19.140787185523624,25.78097246724595],'rot':[0,0,0]}},{'pos':[-30.264351346099435,19.150210965575255,25.702599798224206],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000002167,0.40000000000002167,0.40000000000002167],'useTex':false,'partInfo':{'instance':'weapon','type':'banana','pos':[-30.264351346099435,19.150210965575255,25.702599798224206],'rot':[0,0,0]}},{'pos':[31.510217290885894,2.015705525117504,24.53380727681146],'rot':[0,0,0],'size':[5.999999999999987,10.000000000000007,20.00000000000015],'col':[0.39551306023030697,0,0]},{'pos':[22.07057005685509,-5.041465876046285,30.487209020603423],'rot':[0,0,27],'size':[22.000000000000178,16.000000000000092,7.99999999999998],'col':[0.3937219470166917,0,0]},{'pos':[30.477766378428115,6.485568573104634,10.558163300754103],'rot':[0,0,0],'size':[7.99999999999998,1,7.99999999999998],'col':[0.39656416259986105,0,0]},{'pos':[18.58934547475656,12.011922840175234,15.570433475675097],'rot':[0,0,0],'size':[20.00000000000015,30.00000000000029,2.000000000000001],'col':[0.2001447395096987,0.2040850021060887,0.20081065926917763]},{'pos':[29.28682568864335,10.927261088767107,28.575896528267528],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000136,0.9000000000000266],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[29.28682568864335,10.927261088767107,28.575896528267528],'weapon':'shotgun'}},{'pos':[31.72071018153634,10.794523681843168,11.874999495830451],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000158,0.9000000000000388],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[31.72071018153634,14.794523681843168,11.874999495830451],'weapon':'wand'}},{'pos':[30.7516517372134,10.467314088890149,-27.3716073323395],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000001625,0.9000000000000372],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[30.7516517372134,10.467314088890149,-27.3716073323395],'weapon':'shotgun'}},{'pos':[27.27297948247527,10.788956738026364,-30.484751582727736],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000001537,0.9000000000000306],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[27.27297948247527,10.788956738026364,-30.484751582727736],'weapon':'gun'}},{'pos':[28.111689811647025,11.160001585340826,8.868750543920166],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.30000000000001137,0.9000000000000228],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[28.111689811647025,11.160001585340826,8.868750543920166],'weapon':'railgun'}},{'pos':[30.23784095578231,9.706311239784286,10.467418931573452],'size':[0.75,1.325,0.75],'col':[1.00000000000002,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[30.23784095578231,9.706311239784286,10.467418931573452]}},{'pos':[26.350312171392588,1.3158407769099263,9.211851990347812],'size':[0.75,1.325,0.75],'col':[1.0000000000000149,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[26.350312171392588,1.3158407769099263,9.211851990347812]}},{'pos':[25.77445288253572,1.3975131475401508,10.397620889846399],'size':[0.75,1.325,0.75],'col':[1.000000000000014,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[25.77445288253572,1.3975131475401508,10.397620889846399]}},{'pos':[31.44644611984595,16.971490559163826,15.598939088563956],'size':[5.999999999999987,20.00000000000015,0.049999999999999684],'col':[0.1499999999999999,0.40000000000000524,1.0000000000000093],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-2.519464600910714,12.047261088767124,-18.473094680643495],'rot':[0,0,0],'size':[2.000000000000001,30.00000000000029,16.000000000000092],'col':[0.20560139828924462,0.20522386471471044,0.19986787158874164]},{'pos':[-13.385043251512347,-1.504792611427097,15.623439679054712],'rot':[0,0,0],'size':[43.999999999999645,3.049999999999997,2.0500000000000007],'col':[0.2003993546078282,0.19620058636810422,0.19664054730048863]},{'pos':[-13.378981978623457,13.242282488819875,15.564209503155013],'size':[44.049999999999635,27.500000000000256,0.1499999999999997],'col':[0.1499999999999999,0.40000000000000613,1.0000000000000102],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[15.535148308666272,2.0314196232669843,-11.453727695550151],'rot':[0,0,0],'size':[38.049999999999976,10.000000000000007,2.000000000000001],'col':[0.20043717534719807,0.20537082634765813,0.20088135371721805]},{'pos':[16.53042953035328,16.981372007002296,-11.343218756928737],'size':[36.00000000000009,20.00000000000015,0.15000000000000002],'col':[0.1499999999999999,0.40000000000000546,1.0000000000000095],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-10.647104045607264,2.8140679713197994,-22.285079402019598],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000737,0.9000000000000135],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.647104045607264,2.8140679713197994,-22.285079402019598],'weapon':'shotgun'}},{'pos':[-11.927818670254002,1.7584312977715797,-14.026534539107974],'rot':[0,0,0],'size':[1,1,1],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000088],'useTex':false,'partInfo':{'instance':'box','pos':[-11.927818670254002,1.7584312977715797,-14.026534539107974],'rot':[0,0,0],'size':[1,1,1]}},{'pos':[3.2925102748791746,2.2608039163690217,22.401828636341456],'rot':[52,68,24],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[3.2925102748791746,2.2608039163690217,22.401828636341456],'mass':1,'rot':[52,68,24],'size':[1,1,1]}},{'pos':[5.137528801471319,2.2608039163690217,23.433771772629388],'rot':[33,4,4],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[5.137528801471319,2.2608039163690217,23.433771772629388],'mass':1,'rot':[33,4,4],'size':[1,1,1]}},{'pos':[3.8302469912059465,-0.3674027588423199,23.45706693708248],'size':[0.5,0.5,0.5],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[3.8302469912059465,-0.3674027588423199,23.45706693708248],'mass':1,'radius':0.5}},{'pos':[5.4512411192094525,-0.06751869844975067,21.252837839851864],'size':[0.5,0.5,0.5],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[5.4512411192094525,-0.06751869844975067,21.252837839851864],'mass':1,'radius':0.5}},{'pos':[3.3460223886462446,5.221419623266981,24.111211620034197],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'wand','pos':[3.3460223886462446,5.221419623266981,24.111211620034197],'rot':[0,0,0]}},{'pos':[-34.12492716232502,-2.8227346847805626,24.1376153287471],'rot':[0,0,0],'size':[0.15000000000000147,0.22500000000000153,0.15],'col':[1.0000000000000089,0.30924843430191196,0],'useTex':false},{'pos':[-34.12492716232502,-2.935234684780566,24.087615328747102],'rot':[0,0,0],'size':[0.15000000000000147,0.22500000000000153,0.05],'col':[1.0000000000000133,0.30924843430191284,0],'useTex':false},{'pos':[-34.12492716232502,-2.935234684780566,24.18761532874712],'rot':[0,0,0],'size':[0.15000000000000147,0.22500000000000153,0.05],'col':[1.0000000000000089,0.30924843430191196,0],'useTex':false},{'pos':[-34.07492716232501,-2.8102346847805624,24.1376153287471],'rot':[0,0,0],'size':[0.11250000000000145,0.037500000000000006,0.075],'col':[0,0.29999999999999966,1],'useTex':false}]#[0,20.05000000000017,0]#[-30.350000000000296,21.000000000000178,30.400000000000148]#[29.350000000000282,10.25000000000001,-29.450000000000273]#[-23,0,25]",
    "[{'pos':[0,-4,0],'size':[40,2,45],'rot':[0,0,0],'col':[0.34000000000000696,0.3400000000000105,0.33000000000001517]},{'pos':[0,-3.100000000000003,0],'rot':[0,0,0],'size':[40,0.3,45],'col':[0.9200000000000303,0.9100000000000297,0.9000000000000299],'useTex':false},{'pos':[-0.7413117272492403,-0.20999841465916524,12.685490227612236],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000513,0.40000000000000513,0.40000000000000513],'useTex':false,'partInfo':{'instance':'weapon','type':'lantern','pos':[-0.7413117272492403,-0.20999841465916524,12.685490227612236],'rot':[0,0,0]}},{'pos':[-9.237338424544257,2.2495096459265245,-12.539815678426772],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000057],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-9.237338424544257,2.2495096459265245,-12.539815678426772],'weapon':'bow'}},{'pos':[13.927017380071907,2.740001585340859,-16.969276946965454],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[13.927017380071907,2.740001585340859,-16.969276946965454],'weapon':'lantern'}},{'pos':[-10.599999999999996,-3.100000000000003,0],'rot':[0,77,0],'size':[11.399999999999956,10.599999999999989,10.499999999999893],'col':[0.920000000000011,0.9100000000000104,0.9000000000000106],'useTex':false},{'pos':[-8.200000000000003,-5.449999999999995,10.200000000000026],'rot':[47,147,68],'size':[3.849999999999964,17.149999999999984,5.2999999999998995],'col':[0.9200000000000144,0.9100000000000137,0.9000000000000139],'useTex':false},{'pos':[12.84999999999999,-2.199999999999994,-1.4999999999999805],'rot':[20,58,0],'size':[13.29999999999995,16.149999999999988,12.04999999999989],'col':[0.9200000000000179,0.9100000000000172,0.9000000000000175],'useTex':false},{'pos':[-7.608180990869835,4.880001585340824,2.8930992853780957],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-7.608180990869835,4.880001585340824,2.8930992853780957],'weapon':'sniper'}},{'pos':[21.599999999999955,6.650000000000005,5.450000000000003],'rot':[0,0,0],'size':[11.399999999999963,1.8999999999999997,12.999999999999886],'col':[0.3400000000000034,0.34000000000000696,0.3300000000000116]},{'pos':[21.599999999999955,7.599999999999977,5.400000000000003],'rot':[0,0,0],'size':[11.399999999999963,0.44999999999999996,12.999999999999886],'col':[0.9000000000000068,0.8900000000000057,0.9200000000000197],'useTex':false},{'pos':[17.599999999999977,-2.6000000000000285,17.499999999999986],'rot':[0,119,0],'size':[11.399999999999963,35.54999999999997,12.999999999999886],'col':[0.9000000000000139,0.8900000000000128,0.9200000000000268],'useTex':false},{'pos':[20.94999999999999,4.449999999999974,8.749999999999982],'rot':[136,360,0],'size':[5.799999999999972,6.150000000000005,24.049999999999894],'col':[0.9000000000000141,0.8900000000000132,0.920000000000027],'useTex':false},{'pos':[22.179222833906373,11.310001585340785,2.900594242346292],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[22.179222833906373,11.310001585340785,2.900594242346292],'weapon':'railgun'}},{'pos':[19.30583019045994,17.170001585340792,11.949307100233812],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000066],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[19.30583019045994,17.170001585340792,11.949307100233812],'weapon':'gun'}},{'pos':[16.82886808174525,17.720001585340743,14.790316558850376],'size':[0.75,1.325,0.75],'col':[1.0000000000000087,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[16.82886808174525,17.720001585340743,14.790316558850376]}},{'pos':[15.870378993964188,17.15000158534079,22.72729346611685],'size':[0.75,1.325,0.75],'col':[0.09999999999999981,0.300000000000002,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[15.870378993964188,17.15000158534079,22.72729346611685],'weapon':'shotgun'}},{'pos':[21.95000000000003,5.399999999999975,25.349999999999905],'rot':[0,119,0],'size':[11.399999999999963,1.25,12.999999999999886],'col':[0.900000000000021,0.890000000000019,0.9200000000000339],'useTex':false},{'pos':[21.95000000000003,3.4499999999999815,25.349999999999905],'rot':[0,119,0],'size':[11.399999999999963,2.7500000000000004,12.999999999999886],'col':[0.3700000000000241,0.40000000000002245,0.36999999999999944],'useTex':true},{'pos':[7.075867032095787,20.8100015853408,-0.9644270366893013],'size':[68.80000000000041,35.099999999999966,76.80000000000055],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'particleSystem','particleSystemData':{'pos':[7.075867032095787,20.8100015853408,-0.9644270366893013],'size':[68.80000000000041,35.099999999999966,76.80000000000055],'minVelX':-0.125,'maxVelX':0.12499999999999996,'minVelY':-0.13749999999999962,'maxVelY':0.012500000000000011,'minVelZ':-0.14999999999999997,'maxVelZ':0.13749999999999996,'minR':0.9550000000000016,'maxR':1,'minG':0.9430000000000021,'maxG':1,'minB':0.9400000000000022,'maxB':1,'minLife':76.40000000000056,'maxLife':104.00000000000101,'grav':-0.003000000000000001,'minSize':10,'maxSize':100,'productionRate':1,'batchAmount':2}},{'pos':[16.30000000000004,-2.199999999999994,-7.249999999999963],'rot':[140,58,0],'size':[13.49999999999995,5.350000000000014,15.549999999999901],'col':[0.9200000000000215,0.9100000000000208,0.900000000000021],'useTex':false},{'pos':[-14.226100082966523,-2.7651478671291247,5.503201726686482],'rot':[0,0,0],'size':[0.1625,0.17500000000000002,0.13749999999999998],'col':[1.0000000000000044,0,1.0000000000000044],'useTex':false},{'pos':[-14.226100082966523,-2.865147867129126,5.540701726686483],'rot':[0,0,0],'size':[0.1625,0.22500000000000006,0.05],'col':[1.0000000000000089,0,1.0000000000000089],'useTex':false},{'pos':[-14.226100082966523,-2.865147867129126,5.465701726686482],'rot':[0,0,0],'size':[0.1625,0.22500000000000006,0.05],'col':[1.0000000000000089,0,1.0000000000000089],'useTex':false},{'pos':[-14.27610008296652,-2.7651478671291247,5.503201726686482],'rot':[0,0,0],'size':[0.13749999999999998,0.075,0.0875],'col':[0,0.35999999999999976,1],'useTex':false}]#[0,-1.6000000000000076,0]#[0,0,20]#[22.350000000000005,7.149999999999993,26.399999999999917]#[0,-2,10]",
    "[{'pos':[0,-4.9999999999999964,26.749999999999947],'size':[23.949999999999967,2,15.74999999999945],'rot':[0,0,0],'col':[0.3300000000000183,0.34000000000001984,0.3300000000000174]},{'pos':[23.699999999999932,-3.599999999999995,26.749999999999947],'rot':[0,0,0],'size':[23.949999999999967,30.599999999999927,114.80000000000055],'col':[0.3300000000000174,0.34000000000001895,0.3300000000000165]},{'pos':[-12.10000000000003,-3.599999999999995,26.749999999999947],'rot':[0,0,0],'size':[1,12.599999999999994,114.95000000000056],'col':[0.3300000000000183,0.34000000000001984,0.3300000000000174]},{'pos':[0,-4.9999999999999964,42.05000000000027],'rot':[0,0,0],'size':[23.949999999999967,33.60000000000003,15.74999999999945],'col':[0.3300000000000174,0.34000000000001895,0.3300000000000165]},{'pos':[0,-13.499999999999982,26.749999999999947],'rot':[0,0,0],'size':[23.949999999999967,12.29999999999999,125.20000000000071],'col':[0.3300000000000174,0.34000000000001895,0.3300000000000165]},{'pos':[6.039262521791948,-7.737950752168929,13.994356040608926],'size':[39,3.900000000000011,57.4500000000001],'col':[2,0,0],'rot':[0,0,0],'useTex':false,'special':'lava'},{'pos':[0,-4.9999999999999964,-21.49999999999995],'rot':[0,0,0],'size':[23.949999999999967,2,15.74999999999945],'col':[0.3300000000000183,0.34000000000001984,0.3300000000000174]},{'pos':[8.074999999999996,-4.9999999999999964,-37.100000000000165],'rot':[0,0,0],'size':[41.450000000000074,34.19999999999991,15.74999999999945],'col':[0.3300000000000196,0.3400000000000212,0.3300000000000187]},{'pos':[-12.10000000000003,3.850000000000007,26.749999999999947],'rot':[0,0,0],'size':[1,1,114.95000000000056],'col':[0.33000000000002006,0.3400000000000216,0.33000000000001917]},{'pos':[-12.10000000000003,5.299999999999997,26.749999999999947],'rot':[0,0,0],'size':[1,1,114.95000000000056],'col':[0.33000000000002094,0.3400000000000225,0.33000000000002006]},{'pos':[-12.10000000000003,24.699999999999882,26.749999999999947],'rot':[0,0,0],'size':[1,36.999999999999986,114.95000000000056],'col':[0.3300000000000205,0.34000000000002206,0.3300000000000196]},{'pos':[5.699999999999944,16.149999999999924,26.749999999999947],'rot':[0,0,0],'size':[38.60000000000001,10.399999999999995,114.95000000000056],'col':[0.3300000000000205,0.34000000000002206,0.3300000000000196]},{'pos':[7.579398400029047,-0.5365439292850065,-23.01369724370486],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[7.579398400029047,-0.5365439292850065,-23.01369724370486],'weapon':'ball'}},{'pos':[-8.021041450962615,-0.5365439292850065,-22.46745878333123],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-8.021041450962615,-0.5365439292850065,-22.46745878333123],'weapon':'boomer'}},{'pos':[0,1,5],'size':[1,1,1],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'line','lineData':{'p1':[-12.250000000000025,6.150000000000006,4],'p2':[-1.5999999999999994,4.050000000000001,4],'thickness1':0.25,'thickness2':0.25,'col1':[1.2420000000000009,1.1160000000000008,0,-0.003500000000000746],'col2':[1.1369999999999985,0.9855000000000007,0,0.38049999999999945],'widthScale':384.8500000000184,'heightScale':2.1499999999999964,'detail':'Low'}},{'render':false,'pos':[0,1,5],'size':[1,1,1],'rot':[0,0,0],'col':[0,0,0],'special':'line','lineData':{'p1':[-12.250000000000025,4.5000000000000115,4],'p2':[-1.5999999999999994,2.300000000000007,4],'thickness1':0.25,'thickness2':0.25,'col1':[1.2420000000000009,1.1160000000000008,0,-0.003500000000000746],'col2':[1.1369999999999985,0.9855000000000007,0,0.38049999999999945],'widthScale':384.8500000000184,'heightScale':2.1499999999999964,'detail':'Low'}},{'render':false,'pos':[0,1,5],'size':[1,1,1],'rot':[0,0,0],'col':[0,0,0],'special':'line','lineData':{'p1':[-12.250000000000025,2.950000000000017,2],'p2':[-1.5999999999999994,2.300000000000007,2],'thickness1':0.25,'thickness2':0.25,'col1':[1.2420000000000009,1.1160000000000008,0,-0.003500000000000746],'col2':[1.1369999999999985,0.9855000000000007,0,0.38049999999999945],'widthScale':384.8500000000184,'heightScale':2.1499999999999964,'detail':'Low'}},{'pos':[5.778560825154102,-6.218008100181836,11.734913762782156],'rot':[0,0,0],'size':[3.9999999999999982,3.850000000000006,4.400000000000002],'col':[0.23693655954900864,0.8002777381502788,0.4545878787311667]},{'pos':[-4.7214391748459015,-6.218008100181836,11.734913762782156],'rot':[0,0,0],'size':[3.9999999999999982,3.850000000000006,4.400000000000002],'col':[0.23693655954900864,0.8002777381502824,0.45458787873116757]},{'pos':[-7.171439174845904,-6.218008100181836,3.5849137627821657],'rot':[0,0,0],'size':[12.799999999999985,3.850000000000006,1.400000000000001],'col':[0.23693655954900864,0.8002777381502859,0.45458787873116846]},{'pos':[6.328560825154103,-6.218008100181836,3.5849137627821657],'rot':[0,135,0],'size':[6.4,3.850000000000006,3.4500000000000024],'col':[0.23693655954900864,0.8002777381502895,0.45458787873116935]},{'pos':[-0.3214391748459023,-8.868008100181825,-3.4150862372178366],'rot':[49,204,38],'size':[11.999999999999988,7.050000000000009,4.450000000000003],'col':[0.23693655954900864,0.800277738150293,0.45458787873117024]},{'pos':[-8.357861646081096,-0.4935755005913243,-16.35010157465085],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-8.357861646081096,-0.4935755005913243,-16.35010157465085],'weapon':'bow'}},{'pos':[0,0,25],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'wand','pos':[0,0,25],'rot':[0,0,0]}}]#[0,8,0]#[0,0,28.849999999999937]#[0,-3.1000000000000005,-23.299999999999955]#[-6,-2,24]",
    "[{'pos':[0,-4,20],'size':[8,2,8],'rot':[0,0,0],'col':[0.34000000000000447,0.35000000000000625,0.3500000000000045]},{'pos':[0,0.2500000000000011,11.95000000000002],'rot':[90,0,0],'size':[18,2,20],'col':[0.3400000000000034,0.3500000000000061,0.3500000000000034]},{'pos':[10,0.2500000000000011,3],'rot':[0,0,0],'size':[2,20,20],'col':[0.34000000000000385,0.35000000000000653,0.35000000000000386]},{'pos':[10,12.749999999999982,3],'rot':[0,0,0],'size':[2,5,20],'col':[0.34000000000000474,0.3500000000000074,0.35000000000000475]},{'pos':[10,21,3],'rot':[0,90,0],'size':[20.062499999999986,12,18],'col':[0.3400000000000052,0.35000000000000786,0.3500000000000052]},{'pos':[14.199999999999985,9.212499999999988,16.349999999999945],'rot':[0,90,0],'size':[9.05,2,17.300000000000004],'col':[0.34000000000000696,0.35000000000000964,0.35000000000000697]},{'pos':[20.949999999999985,17.462499999999984,7.999999999999962],'rot':[44,0,0],'size':[4,2,25.349999999999966],'col':[0.34000000000000696,0.35000000000000964,0.35000000000000697]},{'pos':[19.837499999999974,25.98749999999991,-3.7375000000000442],'rot':[0,90,0],'size':[6.499999999999999,2,6.050000000000036],'col':[0.34000000000000785,0.3500000000000105,0.35000000000000786]},{'pos':[13.401759071325856,28.490001585340835,5.030688309759084],'size':[1,1,1],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'line','lineData':{'p1':[13.401759071325856,30.940001585340845,5],'p2':[13.401759071325856,24.890001585340844,5],'thickness1':4,'thickness2':4,'col1':[1.1100000000000008,1.0470000000000002,0,0.8439999999999991],'col2':[1,1,0,-0.023000000000000874],'widthScale':1,'heightScale':1,'detail':'High'}},{'pos':[13.500000000000043,-4,12.487500000000036],'rot':[0,0,0],'size':[5,2,5],'col':[0.3400000000000034,0.3500000000000052,0.3500000000000034]},{'pos':[13.500000000000043,-1.1499999999999988,1.8875000000000466],'rot':[19,0,0],'size':[5,2,9.049999999999999],'col':[0.3400000000000043,0.3500000000000061,0.3500000000000043]},{'pos':[6.512499999999993,-8.737500000000026,-4.462500000000003],'rot':[0,0,0],'size':[5,2,4.999999999999998],'col':[0.34000000000000696,0.35000000000000875,0.35000000000000697]},{'pos':[6.512499999999993,-2.487500000000022,6.4875000000000025],'rot':[139,0,0],'size':[5,2,13.64999999999998],'col':[0.3400000000000083,0.3500000000000101,0.3500000000000083]},{'pos':[-2.525000000000003,10.062499999999986,12],'rot':[0,0,0],'size':[12.84999999999998,9.999999999999998,2],'col':[0.3400000000000092,0.35000000000001097,0.3500000000000092]},{'pos':[-4.187500000000016,3.312499999999979,8.587500000000004],'rot':[0,0,0],'size':[5,2,4.999999999999998],'col':[0.34000000000000785,0.35000000000000964,0.35000000000000786]},{'pos':[5.36249999999999,5.912499999999981,2.5374999999999988],'rot':[0,101,30],'size':[4,2,10.849999999999993],'col':[0.34000000000000874,0.3500000000000105,0.35000000000000875]},{'pos':[4.323388535155084,30.106300749381752,11.164420652970357],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[4.323388535155084,30.106300749381752,11.164420652970357],'weapon':'bow'}},{'pos':[0,0,19],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000161,0.4000000000000161,0.4000000000000161],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[0,0,19],'rot':[0,0,0]}}]#[0,8,0]#[0,0,20]#[13.399999999999984,28.299999999999915,5]#[13,28,5]",
    "[{'pos':[0,-4,1.95],'size':[12,2,12],'rot':[0,0,0],'col':[0.3300000000000156,0.3200000000000185,0.3300000000000156]},{'pos':[0,4.000000000000003,-7.700000000000005],'rot':[90,0,0],'size':[12,2,12],'col':[0.3300000000000134,0.3200000000000154,0.3300000000000125]},{'pos':[9.2,6.650000000000001,0],'rot':[90,90,0],'size':[12,2,12],'col':[0.330000000000009,0.320000000000011,0.3300000000000081]},{'pos':[-6.950000000000003,11,-4.650000000000002],'rot':[0,0,0],'size':[12,2,12],'col':[0.3300000000000067,0.32000000000000955,0.3300000000000067]},{'pos':[7.9500000000000055,-2.4499999999999957,3.5375000000000063],'rot':[0,0,0],'size':[5,16.999999999999975,5],'col':[0.3300000000000066,0.3200000000000095,0.3300000000000066]},{'pos':[-3.349999999999996,12.849999999999994,-8.300000000000008],'rot':[0,0,0],'size':[3,2,3],'col':[1.0000000000000204,0.18000000000000038,0.15999999999999992]},{'pos':[-3.3702604838946764,16.570001585340805,-8.254889851524558],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000056,0.9000000000000195],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-3.3702604838946764,16.570001585340805,-8.254889851524558],'weapon':'revolver'}},{'pos':[6.663313087661616,9.380001585340821,4.0226946224736935],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000168],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[6.663313087661616,9.380001585340821,4.0226946224736935],'weapon':'ball'}},{'pos':[-8.182324461480231,15.360001585340815,-2.845814602802855],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000078,0.4000000000000078,0.4000000000000078],'useTex':false,'partInfo':{'instance':'weapon','type':'sniper','pos':[-8.182324461480231,15.360001585340815,-2.845814602802855],'rot':[0,0,0]}},{'pos':[-9.105861896876153,15.360001585340815,-8.075869918516288],'size':[0.75,1.325,0.75],'col':[1.000000000000016,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-9.105861896876153,15.360001585340815,-8.075869918516288]}},{'pos':[-5.3000000000000025,14.050000000000018,33.04999999999994],'rot':[0,0,0],'size':[12,2,12],'col':[0.33000000000000496,0.32000000000000783,0.33000000000000496]},{'pos':[-5.3000000000000025,20.750000000000036,38],'rot':[90,0,0],'size':[12,2,12],'col':[0.33000000000000673,0.3200000000000096,0.33000000000000673]},{'pos':[-14.899999999999975,23.749999999999964,48.150000000000134],'rot':[0,0,0],'size':[3,3,3],'col':[1.0000000000000284,0.6100000000000074,0]},{'pos':[-22.149999999999952,37.45,60.7000000000003],'rot':[0,0,76],'size':[3,3,3],'col':[1.0000000000000417,0.6100000000000154,0]},{'pos':[9.250000000000007,32.899999999999935,71.55000000000037],'rot':[0,92,0],'size':[2,12.399999999999988,16.449999999999974],'col':[1.0000000000000178,0.05999999999999972,0.07999999999999974]},{'pos':[-7.8999999999999995,34.949999999999974,60.7000000000003],'rot':[0,143,0],'size':[3,3,3],'col':[1.0000000000000506,0.6100000000000207,0]},{'pos':[-13.849999999999977,30.749999999999957,52.90000000000019],'rot':[153,138,144],'size':[3,3,3],'col':[1.0000000000000506,0.6100000000000207,0]},{'pos':[-2.8732303331713016,17.426030804191914,31.48051273258121],'size':[0.5,0.5,0.5],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[-2.8732303331713016,17.426030804191914,31.48051273258121],'mass':1,'radius':0.5}},{'pos':[-5.674769024648822,16.911663533937265,32.294219927076725],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[-5.674769024648822,16.911663533937265,32.294219927076725],'rot':[0,0,0]}},{'pos':[2.560444743306928,-1.3783364660627375,1.1286675623892615],'rot':[84,48,60],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'useTex':false,'partInfo':{'instance':'box','pos':[2.560444743306928,-1.3783364660627375,1.1286675623892615],'mass':1,'rot':[84,48,60],'size':[1,1,1]}},{'pos':[-3.275736797849756,-0.5883364660627342,-0.12188632236020806],'size':[0.5,0.5,0.5],'col':[0.09999999999999987,0.30000000000000204,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[-3.275736797849756,-0.5883364660627342,-0.12188632236020806],'mass':1,'radius':0.5}},{'pos':[-0.7512212872407377,-1.6283364660627422,2.2312863097886777],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'shotgun','pos':[-0.7512212872407377,-1.6283364660627422,2.2312863097886777],'rot':[0,0,0]}},{'pos':[15.899999999999977,27.25000000000002,53.65000000000023],'rot':[0,0,0],'size':[16,2,16],'col':[0.33000000000000895,0.32000000000001183,0.33000000000000895]},{'pos':[22.887500000000006,31.76250000000015,53.587500000000375],'rot':[90,90,0],'size':[16,2,7.749999999999984],'col':[0.3300000000000143,0.32000000000001716,0.3300000000000143]},{'pos':[8.83750000000001,34.21250000000005,53.587500000000375],'rot':[90,90,0],'size':[16,2,12],'col':[0.3300000000000147,0.3200000000000176,0.3300000000000147]},{'pos':[15.899999999999977,37.16250000000012,60.600000000000335],'rot':[90,0,0],'size':[16,2,6],'col':[0.33000000000001384,0.3200000000000167,0.33000000000001384]},{'pos':[20.49999999999999,31,60.600000000000335],'rot':[90,0,0],'size':[3,2,6.349999999999999],'col':[0.3300000000000147,0.3200000000000176,0.3300000000000147]},{'pos':[11.35000000000002,31,60.600000000000335],'rot':[90,0,0],'size':[3,2,6.349999999999999],'col':[0.3300000000000156,0.3200000000000185,0.3300000000000156]},{'pos':[19.91236455935585,29.74000158534065,52.333879135512916],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000056,0.9000000000000177],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[19.91236455935585,29.74000158534065,52.333879135512916],'weapon':'railgun'}},{'pos':[13.011503402980438,29.74000158534065,52.1674102106914],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000056,0.900000000000015],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[13.011503402980438,29.74000158534065,52.1674102106914],'weapon':'lantern'}},{'pos':[12.92427482039124,29.74000158534065,55.311355371533054],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000065,0.9000000000000212],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[12.92427482039124,29.74000158534065,55.311355371533054],'weapon':'shotgun'}},{'pos':[19.816837085337124,29.74000158534065,54.98534091810452],'size':[0.75,1.325,0.75],'col':[1.0000000000000249,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[19.816837085337124,29.74000158534065,54.98534091810452]}},{'pos':[15.899999999999977,37.67500000000017,46.65000000000023],'rot':[90,0,0],'size':[16,2,5],'col':[0.3300000000000156,0.3200000000000185,0.3300000000000156]},{'pos':[15.66474049717862,32.204841743645325,47.23213633508088],'size':[15.19999999999998,9.049999999999997,0.4499999999999996],'col':[0.1499999999999999,0.4000000000000057,1.0000000000000142],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[15.899999999999977,41.112499999999926,53.65000000000023],'rot':[0,0,0],'size':[16,2,16],'col':[0.3300000000000094,0.3200000000000123,0.3300000000000094]},{'pos':[-5.649999999999988,32.899999999999935,68.10000000000036],'rot':[0,62,0],'size':[2,12.399999999999988,16.449999999999974],'col':[1.0000000000000218,0.05999999999999983,0.0799999999999994]},{'pos':[-28.299999999999926,28.299999999999965,55.90000000000023],'rot':[293,190,160],'size':[3,3,3],'col':[1.0000000000000575,0.6100000000000259,0]},{'pos':[4.064618783535633,17.667314088890073,31.052815131129698],'size':[59.000000000000306,63.20000000000036,88.20000000000071],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'particleSystem','particleSystemData':{'pos':[4.064618783535633,17.667314088890073,31.052815131129698],'size':[59.000000000000306,63.20000000000036,88.20000000000071],'minVelX':0,'maxVelX':0,'minVelY':0,'maxVelY':0.037500000000000006,'minVelZ':0,'maxVelZ':0,'minR':0.41700000000000026,'maxR':0.5260000000000018,'minG':0.4162500000000003,'maxG':0.5256249999999992,'minB':0.4140000000000005,'maxB':0.5260000000000006,'minLife':78.20000000000059,'maxLife':100.55000000000098,'grav':-0.0003124999999999835,'minSize':27.5,'maxSize':61,'productionRate':1,'batchAmount':1}},{'pos':[-9.72101366065469,14.120001585340823,-2.8657254695981007],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'boomer','pos':[-9.72101366065469,14.120001585340823,-2.8657254695981007],'rot':[0,0,0]}},{'pos':[22.887500000000006,36.4124999999999,53.587500000000375],'rot':[90,90,0],'size':[16,2,0.49999999999999994],'col':[0.33000000000001517,0.32000000000001805,0.33000000000001517]},{'pos':[22.887500000000006,39.012499999999726,53.587500000000375],'rot':[90,90,0],'size':[16,2,3.700000000000001],'col':[0.33000000000001606,0.32000000000001894,0.33000000000001606]},{'pos':[21.071082069155526,36.057710598495355,53.47711185431129],'size':[1,1,1],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'line','lineData':{'p1':[22.12108206915554,36.007710598495315,54],'p2':[16.121082069155523,33.65771059849549,54],'thickness1':1,'thickness2':1,'col1':[0.9824999999999975,1.0140000000000007,0,-0.04549999999999656],'col2':[0.9840000000000009,0.997499999999997,0,0.3880000000000001],'widthScale':18.399999999999924,'heightScale':0.49999999999999956,'detail':'Low'}},{'render':false,'pos':[21.071082069155526,36.057710598495355,53.47711185431129],'size':[1,1,1],'rot':[0,0,0],'col':[0,0,0],'special':'line','lineData':{'p1':[22.12108206915554,37.10771059849525,54],'p2':[16.121082069155523,34.75771059849543,54],'thickness1':1,'thickness2':1,'col1':[0.9824999999999975,1.0140000000000007,0,-0.04549999999999656],'col2':[0.9840000000000009,0.997499999999997,0,0.3880000000000001],'widthScale':18.399999999999924,'heightScale':0.49999999999999956,'detail':'Low'}}]#[0,23.199999999999957,0]#[0,0,4.150000000000067]#[16.84999999999994,29.649999999999938,50.600000000000435]#[0,-2,-3]",
    "[{'pos':[0,-4,20.100000000000016],'size':[25,2,25],'rot':[0,0,0],'col':[0.3200000000000056,0.3200000000000056,0.3200000000000056],'useTex':true},{'pos':[-7,-1.679998414659165,20.12182926050129],'size':[0.3,18.849999999999987,11],'col':[0.14999999999999974,0.40000000000001223,1.0000000000000355],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[7,1.0627513500577066,20.334740288923925],'size':[0.2999999999999998,10.449999999999994,11],'col':[0.1499999999999999,0.40000000000000924,1.0000000000000264],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0,-0.609998414659171,14.670306993211085],'size':[14.099999999999994,13.999999999999982,0.2999999999999998],'col':[0.1499999999999999,0.4000000000000048,1.0000000000000162],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0,0.10237084697259746,25.473895379079718],'size':[13.949999999999957,17.49999999999997,0.2999999999999998],'col':[0.1499999999999999,0.4000000000000039,1.0000000000000127],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[0,-4,-9.949999999999974],'rot':[0,0,0],'size':[6,2,25],'col':[0.32000000000000384,0.32000000000000384,0.32000000000000384],'useTex':true},{'pos':[-10.466699331077704,2.650001585340817,10.672217783641106],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000034,0.9000000000000139],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.466699331077704,2.650001585340817,10.672217783641106],'weapon':'shotgun'}},{'pos':[2.548697268559404,2.650001585340817,10.326022240407685],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.30000000000000426,0.9000000000000157],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[2.548697268559404,2.650001585340817,10.326022240407685],'weapon':'sniper'}},{'pos':[9.936084432255122,2.650001585340817,10.129525691675353],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000163],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[9.936084432255122,2.650001585340817,10.129525691675353],'weapon':'railgun'}},{'pos':[9.555695954503607,2.650001585340817,29.676551158635657],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000128],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[9.555695954503607,2.650001585340817,29.676551158635657],'weapon':'boomer'}},{'pos':[-9.926247928450506,2.650001585340817,28.7342335150426],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000137],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-9.926247928450506,2.650001585340817,28.7342335150426],'weapon':'bow'}},{'pos':[-3.621299193636247,2.650001585340817,11.160374478070551],'size':[0.75,1.325,0.75],'col':[1.0000000000000133,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-3.621299193636247,2.650001585340817,11.160374478070551]}},{'pos':[6.495122740951127,2.650001585340817,10.891288541240884],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000021,0.4000000000000021,0.4000000000000021],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[6.495122740951127,2.650001585340817,10.891288541240884],'rot':[0,0,0]}},{'pos':[4.026436406457024,-0.2099984146591849,20.810122358689377],'rot':[0,0,0],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'useTex':false,'partInfo':{'instance':'box','pos':[4.026436406457024,-0.2099984146591849,20.810122358689377],'mass':1,'rot':[0,0,0],'size':[1,1,1]}},{'pos':[-3.091248825693303,-0.2099984146591849,22.145695994259178],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'railgun','pos':[-3.091248825693303,-0.2099984146591849,22.145695994259178],'rot':[0,0,0]}},{'pos':[-3.156312478161594,-0.2099984146591849,20.28152373231083],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'revolver','pos':[-3.156312478161594,-0.2099984146591849,20.28152373231083],'rot':[0,0,0]}},{'pos':[-3.101091420736305,-0.20355071987792606,17.93128698729384],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'banana','pos':[-3.101091420736305,-0.20355071987792606,17.93128698729384],'rot':[0,0,0]}},{'pos':[-4.431462460762871,-0.20891882094679648,19.289978400265273],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.400000000000003,0.400000000000003,0.400000000000003],'useTex':false,'partInfo':{'instance':'weapon','type':'sniper','pos':[-4.431462460762871,-0.20891882094679648,19.289978400265273],'rot':[0,0,0]}},{'pos':[-5.082967827516711,-0.18204393339276415,21.16086160285843],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'candycane','pos':[-5.082967827516711,-0.18204393339276415,21.16086160285843],'rot':[0,0,0]}},{'pos':[-4.690192924120456,-0.2099984146591849,23.42712092634078],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'reverse','pos':[-4.690192924120456,-0.2099984146591849,23.42712092634078],'rot':[0,0,0]}},{'pos':[0,6.70000000000001,20.100000000000016],'rot':[0,0,0],'size':[25,2,25],'col':[0.3200000000000065,0.3200000000000065,0.3200000000000065],'useTex':true}]#[0,8,0]#[0,0,20]#[0,-1.2000000000000004,-19.849999999999948]#[6,-2,17]",
    "[{'pos':[0,-4,20],'size':[24,2,24],'rot':[0,0,0],'col':[0.32000000000000517,0.3500000000000074,0.3500000000000092]},{'pos':[-19.199999999999964,1.457167719820518e-15,-7.39999999999998],'rot':[0,26,0],'size':[24,2,24],'col':[0.3200000000000074,0.3500000000000105,0.3500000000000123]},{'pos':[-7.549999999999992,-1.9499999999999997,5.600000000000036],'rot':[21,40,0],'size':[4,2,11.700000000000024],'col':[0.3200000000000056,0.35000000000000875,0.3500000000000105]},{'pos':[-19.199999999999964,2.9499999999999993,-7.39999999999998],'rot':[0,26,0],'size':[4.600000000000054,7.000000000000004,5.650000000000052],'col':[1.000000000000023,0.07999999999999977,0.06999999999999997]},{'pos':[-12.149999999999984,2.9499999999999993,-12.34999999999997],'rot':[0,142,0],'size':[1.3000000000000516,12.749999999999988,4.050000000000052],'col':[1.000000000000015,0.08000000000000021,0.06999999999999952]},{'pos':[-19.509692805749562,10.810001585340842,-7.3273638695058185],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.900000000000009],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-19.509692805749562,10.810001585340842,-7.3273638695058185],'weapon':'revolver'}},{'pos':[-15.07012222675668,4.720001585340835,-15.25048713648312],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000016,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-15.07012222675668,4.720001585340835,-15.25048713648312],'weapon':'railgun'}},{'pos':[8.849999999999987,2.9499999999999993,-28.39999999999991],'rot':[0,26,0],'size':[5,7.000000000000004,5],'col':[1.0000000000000089,0.07999999999999932,0.06999999999999952]},{'pos':[9.111831663182013,11.570001585340844,-29.043859618519996],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[9.111831663182013,11.570001585340844,-29.043859618519996],'weapon':'sniper'}},{'pos':[-21.990523555756575,4.4000015853408305,1.3763571247803066],'size':[0.75,1.325,0.75],'col':[1.0000000000000044,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-21.990523555756575,4.4000015853408305,1.3763571247803066]}},{'pos':[-20.420054386862972,8.000001585340843,0.7552077147712181],'rot':[36,8,37],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[-20.420054386862972,8.000001585340843,0.7552077147712181],'mass':1,'rot':[36,8,37],'size':[1,1,1]}},{'pos':[-22.95854707250589,6.010001585340835,4.653586209086172],'size':[0.5,0.5,0.5],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[-22.95854707250589,6.010001585340835,4.653586209086172],'mass':1,'radius':0.5}},{'pos':[-26.986669696785942,6.1602806835365715,-5.322005373932439],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'lantern','pos':[-26.986669696785942,6.1602806835365715,-5.322005373932439],'rot':[0,0,0]}},{'pos':[-14.297965858673097,3.096058309578747,-8.11284095795637],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'sniper','pos':[-14.297965858673097,3.096058309578747,-8.11284095795637],'rot':[0,0,0]}},{'pos':[-59.95000000000038,0.5000000000000014,-15.049999999999955],'rot':[0,78,0],'size':[40.90000000000009,2,41.80000000000011],'col':[0.3200000000000047,0.35000000000000786,0.35000000000000964]},{'pos':[-45.30000000000015,12.399999999999993,5.750000000000029],'rot':[0,26,0],'size':[2,24.19999999999995,2],'col':[1.000000000000023,0.07999999999999932,0.06999999999999952]},{'pos':[-29.450000000000014,23.149999999999988,4.200000000000037],'rot':[0,95,0],'size':[2,2,31.399999999999917],'col':[1.0000000000000275,0.07999999999999932,0.06999999999999952]},{'pos':[-15.98164980033753,26.9300015853408,3.1102988603974624],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-15.98164980033753,26.9300015853408,3.1102988603974624],'weapon':'ball'}},{'pos':[-41.06096831729963,6.9700015853408415,-13.562055209383734],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-41.06096831729963,6.9700015853408415,-13.562055209383734],'weapon':'shotgun'}},{'pos':[-54.40000000000023,6.000000000000008,-7.39999999999998],'rot':[0,26,0],'size':[14.000000000000036,9.350000000000001,9.25000000000005],'col':[1.0000000000000364,0.07999999999999932,0.06999999999999952]},{'pos':[-65.91775685809489,5.930001585340869,-1.7871662010377407],'size':[0.75,1.325,0.75],'col':[1.0000000000000133,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-65.91775685809489,5.930001585340869,-1.7871662010377407]}},{'pos':[-57.73968597511954,15.980001585340844,-7.770371562491449],'size':[0.5,0.5,0.5],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[-57.73968597511954,15.980001585340844,-7.770371562491449],'mass':1,'radius':0.5}},{'pos':[-52.973078941435006,16.090676987823436,-8.437604692604562],'rot':[69,16,28],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000092],'useTex':false,'partInfo':{'instance':'box','pos':[-52.973078941435006,16.090676987823436,-8.437604692604562],'mass':1,'rot':[69,16,28],'size':[1,1,1]}},{'pos':[-56.38054550480739,16.090676987823436,-4.509606268534184],'size':[0.75,1.325,0.75],'col':[0.09999999999999976,0.30000000000000276,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-56.38054550480739,16.090676987823436,-4.509606268534184],'weapon':'lantern'}},{'pos':[-50.000000000000014,2.400000000000021,-2.799999999999981],'rot':[0,26,136],'size':[13.450000000000056,9.350000000000001,4],'col':[1.0000000000000364,0.07999999999999932,0.06999999999999952]},{'pos':[-56.05000000000027,6.000000000000008,-24.349999999999962],'rot':[0,65,0],'size':[7.4000000000000465,6.700000000000004,7.350000000000051],'col':[1.0000000000000409,0.07999999999999932,0.06999999999999952]},{'pos':[-79.84159909982786,5.367555990341527,-1.467840922781871],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-79.84159909982786,5.367555990341527,-1.467840922781871],'weapon':'gun'}},{'pos':[-74.83345092353677,5.428921728601761,-0.18327223136943271],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'boomer','pos':[-74.83345092353677,5.428921728601761,-0.18327223136943271],'rot':[0,0,0]}},{'pos':[-74.89357418756632,5.612679044250696,-3.1751714534334274],'size':[0.75,1.325,0.75],'col':[1.0000000000000044,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-74.89357418756632,5.612679044250696,-3.1751714534334274]}},{'pos':[7.4041056442531925,-0.6306799582655667,13.584510725419971],'rot':[87,69,20],'size':[1,1,1],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'useTex':false,'partInfo':{'instance':'box','pos':[7.4041056442531925,-0.6306799582655667,13.584510725419971],'mass':1,'rot':[87,69,20],'size':[1,1,1]}},{'pos':[10.407499551583332,-1.5406761931367856,12.806248778540523],'size':[0.5,0.5,0.5],'col':[0.09999999999999978,0.3000000000000008,0.9000000000000032],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[10.407499551583332,-1.5406761931367856,12.806248778540523],'mass':1,'radius':0.5}},{'pos':[-5.137529707850383,-1.3001691476780377,14.014048033353934],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'candycane','pos':[-5.137529707850383,-1.3001691476780377,14.014048033353934],'rot':[0,0,0]}},{'pos':[-5.95631956002748,-0.030093801853902313,7.205789157273852],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'banana','pos':[-5.95631956002748,-0.030093801853902313,7.205789157273852],'rot':[0,0,0]}},{'pos':[-7.667477905662532,-2.069181012386738,13.184990630497182],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[-7.667477905662532,-2.069181012386738,13.184990630497182],'rot':[0,0,0]}},{'pos':[-7.892059680677497,-1.998504074056386,16.727628319987595],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[-7.892059680677497,-1.998504074056386,16.727628319987595],'rot':[0,0,0]}}]#[-33.79999999999994,26.24999999999994,-11.049999999999994]#[0,0,20]#[-74.05000000000052,3.9000000000000066,-35.79999999999954]#[3,-2,15]",
    "[{'pos':[0,-4,17.500000000000018],'size':[10,2,15],'rot':[0,0,0],'col':[0.3275000000000321,0.3275000000000339,0.3400000000000394]},{'pos':[0,0,13.749999999999964],'rot':[0,18,0],'size':[10,6,1],'col':[1.0000000000000802,0.1275000000000026,0.15000000000000902]},{'pos':[1.992094277192947,0.7700015853408289,16.92363672251283],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000003055,0.40000000000003055,0.40000000000003055],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[1.992094277192947,0.7700015853408289,16.92363672251283],'rot':[0,0,0]}},{'pos':[-8.800000000000004,0,-13.150000000000013],'rot':[0,0,0],'size':[4,2,4],'col':[0.3600000000000143,0.35750000000001747,0.38000000000002365]},{'pos':[-9.385772657071499,4.420001585340834,-13.302089598018204],'size':[0.75,1.325,0.75],'col':[0.09999999999999976,0.30000000000001237,0.9000000000000371],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-9.385772657071499,4.420001585340834,-13.302089598018204],'weapon':'gun'}},{'pos':[17.599999999999973,-4,8.250000000000043],'rot':[0,108,0],'size':[6,2,15],'col':[0.32750000000001345,0.3275000000000152,0.34000000000002073]},{'pos':[33.99999999999995,-4,6.600000000000044],'rot':[0,0,0],'size':[9,2,9],'col':[0.3275000000000131,0.3275000000000149,0.3400000000000204]},{'pos':[33.99999999999995,7.625000000000001,2.650000000000058],'rot':[0,0,0],'size':[8.999999999999986,25.399999999999952,1],'col':[0.32750000000001345,0.3275000000000152,0.34000000000002073]},{'pos':[33.99999999999995,3.499999999999999,10.600000000000035],'rot':[0,0,0],'size':[8.999999999999986,13.549999999999992,1],'col':[0.32750000000001434,0.3275000000000161,0.3400000000000216]},{'pos':[33.99999999999995,9.762499999999996,19.90000000000001],'rot':[0,0,0],'size':[8.999999999999986,1,18],'col':[0.32750000000001434,0.3275000000000161,0.3400000000000216]},{'pos':[37.812499999999865,14.362500000000061,34.84999999999999],'rot':[0,0,0],'size':[1,8.200000000000003,12],'col':[0.34000000000000563,0.3325000000000178,0.3450000000000233]},{'pos':[37.912499999999774,11.162500000000009,19.90000000000001],'rot':[0,0,0],'size':[1.2499999999999787,2,18],'col':[1.000000000000013,0.13000000000000034,0.15500000000001868]},{'pos':[41.21249999999959,9.762499999999989,19.90000000000001],'rot':[0,0,0],'size':[5.749999999999981,1,18],'col':[1.000000000000013,0.13000000000000034,0.15500000000001868]},{'pos':[41.21249999999959,13.71249999999998,11.20000000000001],'rot':[0,0,0],'size':[5.749999999999981,8.500000000000004,0.35],'col':[1.0000000000000178,0.13000000000000034,0.15500000000001868]},{'pos':[41.1544422464363,13.880001585340821,15.452125791230026],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000065,0.9000000000000217],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[41.1544422464363,13.880001585340821,15.452125791230026],'weapon':'gun'}},{'pos':[41.23202870537249,13.810001585340839,23.828055251235153],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000737,0.9000000000000217],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[41.23202870537249,13.810001585340839,23.828055251235153],'weapon':'shotgun'}},{'pos':[29.199999999999857,14.362500000000061,34.84999999999999],'rot':[0,0,0],'size':[1,8.200000000000003,12],'col':[0.3400000000000092,0.33250000000002133,0.34500000000002684]},{'pos':[33.612499999999805,9.812499999999996,34.84999999999999],'rot':[0,0,90],'size':[1,8.200000000000003,12],'col':[0.3400000000000074,0.33250000000001956,0.34500000000002506]},{'pos':[33.612499999999805,12.11250000000003,42.449999999999555],'rot':[0,0,90],'size':[4.149999999999993,8.200000000000003,12],'col':[0.3400000000000083,0.33250000000002045,0.34500000000002595]},{'pos':[33.48633663945053,15.396424499408695,36.53022389552486],'size':[7.850000000000002,5.950000000000003,0.09999999999999969],'col':[0.1499999999999999,0.4000000000000039,1.0000000000000089],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[33.031873582395164,12.319920698553927,28.826841040938206],'rot':[0,0,0],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000075],'useTex':false,'partInfo':{'instance':'box','pos':[33.031873582395164,12.319920698553927,28.826841040938206],'mass':1,'rot':[0,0,0],'size':[1,1,1]}},{'pos':[33.80947293047888,17.342708259041604,40.33950274532592],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000068],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[33.80947293047888,17.342708259041604,40.33950274532592],'weapon':'gun'}},{'pos':[33.64999999999996,13.187500000000082,54.27500000000044],'rot':[0,0,0],'size':[14,2,12],'col':[0.34000000000001185,0.332500000000024,0.3450000000000295]},{'pos':[39.46250000000005,15.287500000000112,54.27500000000044],'rot':[149.25,0,0],'size':[2.2499999999999662,2,10.849999999999993],'col':[1.0000000000000218,0.7000000000000139,0]},{'pos':[35.050000000000196,15.787500000000023,54.787500000000385],'rot':[0,0,0],'size':[6.5999999999999694,6.100000000000003,10.849999999999993],'col':[1.00000000000003,0.7000000000000195,0]},{'pos':[34.184047309507974,21.610001585340786,52.82723940484407],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000159],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[34.184047309507974,21.610001585340786,52.82723940484407],'weapon':'bow'}},{'pos':[33.64999999999996,13.187500000000082,54.27500000000044],'rot':[0,0,0],'size':[14,2,12],'col':[0.3500000000000145,0.33250000000002666,0.34500000000003217]},{'pos':[30.24999999999995,17.88750000000006,54.27500000000044],'rot':[131,0,0],'size':[3,2,13.699999999999989],'col':[0,0.27000000000000246,0.730000000000008]},{'pos':[26.749999999999975,22.637500000000056,62.9250000000003],'rot':[0,146,0],'size':[4.799999999999994,1,8.650000000000006],'col':[0,0.27000000000000246,0.730000000000008]},{'pos':[22.450000000000056,22.637500000000056,65.47500000000016],'rot':[0,0,0],'size':[8.099999999999996,1.0250000000000026,5],'col':[0,0.27000000000000335,0.7300000000000111]},{'pos':[27.228863409149827,26.230001585340805,61.46501001723746],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000099],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[27.228863409149827,26.230001585340805,61.46501001723746],'weapon':'boomer'}},{'pos':[21.104006081260103,26.230001585340805,65.12978961537374],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.900000000000007],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[21.104006081260103,26.230001585340805,65.12978961537374],'weapon':'railgun'}},{'pos':[11.799999999999887,21.987500000000082,67.2750000000007],'rot':[0,0,0],'size':[14,2,12],'col':[0.3500000000000163,0.33250000000002844,0.34500000000003395]},{'pos':[18,25.990001585340817,67.31250000000007],'size':[0.2999999999999999,7.5500000000000025,12],'col':[0.1499999999999999,0.4000000000000057,1.0000000000000182],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[11.4436762937761,24.180001585340815,65.5077794362768],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000106],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[11.4436762937761,24.180001585340815,65.5077794362768],'weapon':'gun'}},{'pos':[12.45064015867846,24.18416027364261,67.98623469047352],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.900000000000011],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[12.45064015867846,24.18416027364261,67.98623469047352],'weapon':'gun'}},{'pos':[9.136619719596775,26.18000158534081,67.70494044488082],'size':[0.75,1.325,0.75],'col':[1.000000000000012,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[9.136619719596775,26.18000158534081,67.70494044488082]}},{'pos':[-6.450000000000088,21.987500000000082,67.2750000000007],'rot':[0,0,0],'size':[14,2,12],'col':[0.35000000000001896,0.3325000000000311,0.3450000000000366]},{'pos':[-4.800556143230153,26.430001585340786,68.2099205117105],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000066,0.4000000000000066,0.4000000000000066],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[-4.800556143230153,26.430001585340786,68.2099205117105],'rot':[0,0,0]}},{'pos':[-10.958377837543027,26.43029139885013,71.41593860006387],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.9000000000000141],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-10.958377837543027,26.43029139885013,71.41593860006387],'weapon':'boomer'}},{'pos':[-22.15000000000005,29.837500000000055,61.47500000000103],'rot':[0,0,0],'size':[20.849999999999977,16.799999999999976,1],'col':[0.3500000000000216,0.33250000000003377,0.3450000000000393]},{'pos':[-22.15000000000005,29.837500000000055,73.17500000000106],'rot':[0,0,0],'size':[20.849999999999977,16.799999999999976,1],'col':[0.35000000000002246,0.3325000000000346,0.3450000000000401]},{'pos':[-19.100000000000005,33.487500000000004,67.32500000000098],'rot':[0,0,0],'size':[1,1,12.149999999999952],'col':[0.47000000000000797,0.18999999999999928,0],'useTex':false},{'pos':[-28.999999999999932,30.737500000000068,67.32500000000098],'rot':[0,13,0],'size':[1,1,12.149999999999952],'col':[0.47000000000000797,0.19000000000000017,0],'useTex':false},{'pos':[-38.850000000000016,21.987500000000082,67.2750000000007],'rot':[0,0,0],'size':[14,2,12],'col':[0.3500000000000225,0.33250000000003466,0.34500000000004016]},{'pos':[-57.375000000000135,22.037500000000083,61.700000000000685],'rot':[0,0,0],'size':[23,2,23],'col':[0.3500000000000243,0.33250000000003643,0.34500000000004194]},{'pos':[-57.375000000000135,26.637500000000117,61.700000000000685],'rot':[0,0,0],'size':[3.400000000000026,9.299999999999997,3.450000000000058],'col':[1.0000000000000173,0.1325000000000327,0.1450000000000382]},{'pos':[-47.12649536439389,25.375824678969646,63.803273090525586],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000924,0.40000000000000924,0.40000000000000924],'useTex':false,'partInfo':{'instance':'weapon','type':'gun','pos':[-47.12649536439389,25.375824678969646,63.803273090525586],'rot':[0,0,0]}},{'pos':[-51.32499999999995,26.637500000000117,61.700000000000685],'rot':[38,52,51],'size':[2.3000000000000247,11.74999999999999,2.3500000000000565],'col':[1.0000000000000282,0.1325000000000327,0.1450000000000382]},{'pos':[-57.559934698067856,32.950001585340786,62.22898546250527],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000047,0.900000000000015],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-57.559934698067856,32.950001585340786,62.22898546250527],'weapon':'boomer'}},{'pos':[-54.275,23.937500000000078,69.80000000000076],'rot':[0,0,0],'size':[6.700000000000029,2.5500000000000003,3.8500000000000574],'col':[1.0000000000000346,0.1325000000000327,0.1450000000000382]},{'pos':[-54.35683645078776,28.01000158534083,69.62510901314721],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000746,0.40000000000000746,0.40000000000000746],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[-54.35683645078776,28.01000158534083,69.62510901314721],'rot':[0,0,0]}},{'pos':[33.53318134780057,11.430001585340843,25.142705241797838],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000835,0.40000000000000835,0.40000000000000835],'useTex':false,'partInfo':{'instance':'weapon','type':'candycane','pos':[33.53318134780057,11.430001585340843,25.142705241797838],'rot':[0,0,0]}},{'pos':[-38.10000000000018,29.837500000000055,61.47500000000103],'rot':[0,0,0],'size':[14.899999999999988,16.799999999999976,1],'col':[0.3500000000000252,0.3325000000000373,0.34500000000004283]},{'pos':[-38.700000000000145,22.087500000000038,55.86250000000099],'rot':[0,0,0],'size':[14.899999999999988,2,11.25000000000001],'col':[0.3500000000000252,0.3325000000000373,0.34500000000004283]},{'pos':[-38.05000000000018,29.837500000000055,50.37500000000104],'rot':[0,0,0],'size':[14.899999999999988,16.799999999999976,1],'col':[0.35000000000002857,0.3325000000000407,0.3450000000000462]},{'pos':[-38.05000000000018,25.437499999999993,52.025000000000944],'rot':[0,0,33],'size':[14.899999999999988,1.7500000000000002,2.9999999999999973],'col':[1.0000000000000213,0.12250000000003558,0.1250000000000413]},{'pos':[-26.98750000000031,29.337500000000016,55.97500000000112],'rot':[0,0,360],'size':[10.600000000000025,1.7500000000000002,11.04999999999996],'col':[1.000000000000024,0.12250000000003634,0.12500000000004113]},{'pos':[-22.15000000000005,29.837500000000055,58.47500000000086],'rot':[0,90,0],'size':[5.2499999999999645,16.799999999999976,0.5499999999999999],'col':[0.3500000000000243,0.33250000000003643,0.36500000000004174]},{'pos':[-28.900000000000038,29.837500000000055,50.60000000000082],'rot':[0,0,0],'size':[5.2499999999999645,16.799999999999976,0.5499999999999999],'col':[0.3500000000000243,0.33250000000003643,0.36500000000004174]},{'pos':[-10.087500000000322,29.337500000000016,44.22500000000102],'rot':[0,0,360],'size':[8.450000000000028,5.100000000000003,5.549999999999966],'col':[1.0000000000000275,0.12250000000003634,0.12500000000004113]},{'pos':[14.038243897726705,23.82714541932708,66.08239674873327],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'banana','pos':[14.038243897726705,23.82714541932708,66.08239674873327],'rot':[0,0,0]}},{'pos':[-59.45000000000084,29.837500000000055,50.37500000000104],'rot':[0,0,0],'size':[27.949999999999946,16.799999999999976,1],'col':[0.3500000000000274,0.33250000000003954,0.34500000000004505]},{'pos':[-52.60000000000076,29.837500000000055,73.22500000000134],'rot':[0,0,0],'size':[40.80000000000005,16.799999999999976,1],'col':[0.3500000000000283,0.33250000000004043,0.34500000000004594]},{'pos':[-68.90000000000114,29.837500000000055,62.825000000001296],'rot':[0,90,0],'size':[27.14999999999996,16.799999999999976,1],'col':[0.3500000000000292,0.3325000000000413,0.3450000000000468]},{'pos':[-18.05000000000067,29.837500000000055,41.12500000000088],'rot':[0,0,0],'size':[27.14999999999996,16.799999999999976,1],'col':[0.35000000000003006,0.3325000000000422,0.3450000000000477]},{'pos':[-26.8500000000007,29.837500000000055,46.07500000000091],'rot':[0,90,0],'size':[9.600000000000009,16.799999999999976,1],'col':[0.35000000000003095,0.3325000000000431,0.3450000000000486]},{'pos':[-5.800000000000748,29.837500000000055,53.92500000000129],'rot':[0,90,0],'size':[15.199999999999992,16.799999999999976,1],'col':[0.35000000000003273,0.33250000000004487,0.3450000000000504]},{'pos':[-8.550000000000717,29.837500000000055,61.475000000001316],'rot':[0,0,0],'size':[6.449999999999998,16.799999999999976,1],'col':[0.3500000000000363,0.3325000000000484,0.34500000000005393]},{'pos':[-16.45000000000078,26.037500000000122,51.27500000000143],'rot':[0,0,0],'size':[21.75000000000007,2,18.950000000000028],'col':[0.35000000000003806,0.3325000000000502,0.3450000000000557]},{'pos':[-14.350000000000694,29.837500000000055,56.32500000000141],'rot':[0,0,0],'size':[15.899999999999967,16.799999999999976,1],'col':[0.3500000000000376,0.33250000000004976,0.34500000000005526]},{'pos':[-19.28750000000024,28.774999999999963,42.8250000000011],'rot':[0,0,207],'size':[11.800000000000033,1,3.249999999999968],'col':[1.0000000000000346,0.12250000000003647,0.1250000000000413]},{'pos':[-31.137500000000788,26.237500000000097,53.375000000001506],'rot':[0,0,0],'size':[2.4,5.749999999999987,16.099999999999987],'col':[0.3500000000000385,0.33250000000005064,0.34500000000005615]},{'pos':[-40.42045657051293,27.355242342541786,57.888828402327235],'size':[0.7750000000000002,0.7750000000000002,0.7750000000000002],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000057],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[-40.42045657051293,27.355242342541786,57.888828402327235],'mass':1,'radius':0.7750000000000002}},{'pos':[-38.72658579810536,27.355242342541786,58.11176742175496],'rot':[44,32,20],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000064],'useTex':false,'partInfo':{'instance':'box','pos':[-38.72658579810536,27.355242342541786,58.11176742175496],'mass':1,'rot':[44,32,20],'size':[1,1,1]}},{'pos':[-24.953959561120886,32.81000158534086,58.88252065606228],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000059],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-24.953959561120886,32.81000158534086,58.88252065606228],'weapon':'shotgun'}},{'pos':[-29.301382249870052,31.72000158534094,57.954258666578895],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000035,0.4000000000000035,0.4000000000000035],'useTex':false,'partInfo':{'instance':'weapon','type':'bow','pos':[-29.301382249870052,31.72000158534094,57.954258666578895],'rot':[0,0,0]}},{'pos':[-26.98750000000031,27.574999999999985,55.97500000000112],'rot':[0,0,360],'size':[10.600000000000025,1.7500000000000002,11.04999999999996],'col':[1.0000000000000417,0.12250000000003647,0.1250000000000413]},{'pos':[-16.45000000000078,37.48750000000024,51.27500000000143],'rot':[0,0,0],'size':[22.200000000000077,2,19.550000000000036],'col':[0.35000000000004206,0.3325000000000542,0.3450000000000597]},{'pos':[-16.45000000000078,22.98750000000019,50.82500000000145],'rot':[0,0,0],'size':[22.200000000000077,5.100000000000001,20.50000000000005],'col':[0.3500000000000425,0.33250000000005464,0.34500000000006015]},{'pos':[-11.602865230098637,29.61987010699736,52.88599084450322],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.3000000000000038,0.9000000000000108],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-11.602865230098637,29.61987010699736,52.88599084450322],'weapon':'boomer'}},{'pos':[-14.080516123218244,30.641922840175138,52.01331339256321],'size':[0.75,1.325,0.75],'col':[1.000000000000013,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[-14.080516123218244,30.641922840175138,52.01331339256321]}},{'pos':[-2.1500000000008037,30.837499999999945,36.02500000000143],'rot':[0,0,0],'size':[7.400000000000092,2,21.150000000000023],'col':[0.3500000000000434,0.33250000000005553,0.34500000000006104]},{'pos':[-1.752145605349999,34.86565182498174,41.25252969351704],'size':[6.600000000000003,6.600000000000003,0.4499999999999996],'col':[0.1499999999999999,0.40000000000000213,1.0000000000000089],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-2.1720968416588984,34.86000158534089,36.889065065575025],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000061],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-2.1720968416588984,34.86000158534089,36.889065065575025],'weapon':'revolver'}},{'pos':[-2.165418944580081,34.86000158534089,32.91164645863729],'size':[7.199999999999982,5.849999999999999,0.28749999999999976],'col':[0.1499999999999999,0.40000000000000213,1.0000000000000089],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[-2.445862855279323,34.86237084697267,29.319777621236895],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[-2.445862855279323,34.86237084697267,29.319777621236895],'rot':[0,0,0]}},{'pos':[-2.1500000000008037,30.837499999999945,12.975000000001518],'rot':[0,0,0],'size':[16,2,16],'col':[0.35000000000004516,0.3325000000000573,0.3450000000000628]},{'pos':[-2.1500000000008037,38.937500000000185,12.975000000001518],'rot':[0,0,0],'size':[1,15.999999999999998,1],'col':[1.0000000000000044,0.6800000000000026,0],'useTex':true},{'pos':[-2.1500000000008037,42.887500000000244,12.975000000001518],'rot':[0,45,0],'size':[19,1,2],'col':[1.0000000000000064,0.6800000000000044,0],'useTex':true},{'pos':[-2.1500000000008037,42.887500000000244,12.975000000001518],'rot':[0,135,0],'size':[19,1,2],'col':[1.0000000000000089,0.680000000000005,0],'useTex':true},{'pos':[-2.1500000000008037,30.837499999999945,-22.674999999998423],'rot':[0,0,0],'size':[16,2,16],'col':[0.35000000000004694,0.3325000000000591,0.3450000000000646]},{'pos':[-2.1500000000008037,34.562500000000014,-30],'rot':[0,0,0],'size':[16,6,6.750000000000022],'col':[0.3500000000000483,0.3325000000000604,0.3450000000000659]},{'pos':[-0.927532989105598,36.200001585341,-22.296023224469234],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'shotgun','pos':[-0.927532989105598,36.200001585341,-22.296023224469234],'rot':[0,0,0]}},{'pos':[-7.035109351883807,41.070001585341025,-31.643828390703007],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000052],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-7.035109351883807,41.070001585341025,-31.643828390703007],'weapon':'railgun'}},{'pos':[3.182179341957916,39.67000158534098,-31.43029549279022],'size':[0.5,0.5,0.5],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000061],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'sphere','pos':[3.182179341957916,39.67000158534098,-31.43029549279022],'mass':1,'radius':0.5}},{'pos':[-0.000270636524668735,39.07000158534101,-30.651581319878414],'rot':[96,68,12],'size':[1,1,1],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000092],'useTex':false,'partInfo':{'instance':'box','pos':[-0.000270636524668735,39.07000158534101,-30.651581319878414],'mass':1,'rot':[96,68,12],'size':[1,1,1]}},{'pos':[2.655329484751532,39.15000158534075,-29.133487444712912],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000008,0.4000000000000008,0.4000000000000008],'useTex':false,'partInfo':{'instance':'weapon','type':'reverse','pos':[2.655329484751532,39.15000158534075,-29.133487444712912],'rot':[0,0,0]}},{'pos':[-2.100000000000805,36.61249999999999,-41.287499999998616],'rot':[0,0,0],'size':[16,2,16],'col':[0.3500000000000487,0.33250000000006086,0.34500000000006636]},{'pos':[-5.1625000000008034,42.26250000000007,-37.43749999999865],'rot':[0,0,0],'size':[9.799999999999997,10.199999999999998,1],'col':[0.3500000000000496,0.33250000000006175,0.34500000000006725]},{'pos':[0.9624999999991932,42.26250000000007,-48.98749999999842],'rot':[0,0,0],'size':[9.799999999999997,10.199999999999998,1],'col':[0.35000000000005094,0.3325000000000631,0.3450000000000686]},{'pos':[-2.681365118222268,42.320001585340734,-43.273408089315865],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000025,0.9000000000000095],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-2.681365118222268,42.320001585340734,-43.273408089315865],'weapon':'revolver'}},{'pos':[18.266718614040386,0.9000015853408305,8.18688380806175],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'grapplingHook','pos':[18.266718614040386,0.9000015853408305,8.18688380806175],'rot':[0,0,0]}},{'pos':[-2.100000000000805,36.61249999999999,-68.03749999999887],'rot':[0,0,0],'size':[24,2,25],'col':[0.35000000000005227,0.3325000000000644,0.3450000000000699]},{'pos':[-6.731109596749463,39.57435583295972,-45.128518481116465],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.400000000000003,0.400000000000003,0.400000000000003],'useTex':false,'partInfo':{'instance':'weapon','type':'ball','pos':[-6.731109596749463,39.57435583295972,-45.128518481116465],'rot':[0,0,0]}},{'pos':[1.4726334557440732,40.092679044250644,-59.52029681167806],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'revolver','pos':[1.4726334557440732,40.092679044250644,-59.52029681167806],'rot':[0,0,0]}},{'pos':[5.599456376523956,40.46404215849497,-63.5717298733586],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'sniper','pos':[5.599456376523956,40.46404215849497,-63.5717298733586],'rot':[0,0,0]}},{'pos':[6.429459519754884,40.19822258827503,-70.06642825667255],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000081],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[6.429459519754884,40.19822258827503,-70.06642825667255],'weapon':'sniper'}},{'pos':[4.625948279511917,40.734495722076446,-72.52517055346077],'size':[0.75,1.325,0.75],'col':[1.0000000000000095,0,0],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'barrel','pos':[4.625948279511917,40.734495722076446,-72.52517055346077]}},{'pos':[-6.733467336167169,39.82062379687929,-59.10282870613684],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'reverse','pos':[-6.733467336167169,39.82062379687929,-59.10282870613684],'rot':[0,0,0]}},{'pos':[-7.8951447388360325,39.82062379687929,-69.58311035965805],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.4000000000000039,0.4000000000000039,0.4000000000000039],'useTex':false,'partInfo':{'instance':'weapon','type':'boomer','pos':[-7.8951447388360325,39.82062379687929,-69.58311035965805],'rot':[0,0,0]}},{'pos':[-9.633791811325803,39.82000158534077,-75.84096481467398],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000083],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-9.633791811325803,39.82000158534077,-75.84096481467398],'weapon':'boomer'}},{'pos':[-11.156216964754371,40.08000158534072,-57.77050198471421],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000293,0.9000000000000086],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[-11.156216964754371,40.08000158534072,-57.77050198471421],'weapon':'bow'}},{'pos':[-2.100000000000805,39.812500000000036,-68.03749999999887],'rot':[0,0,0],'size':[2.90000000000005,7.400000000000005,5.900000000000056],'col':[0.3400000000000021,0.1700000000000006,0],'useTex':false},{'pos':[-0.25000000000080386,39.812500000000036,-68.03749999999887],'rot':[8,54,225],'size':[2.1500000000000496,5.300000000000003,4.500000000000063],'col':[0.34000000000000297,0.1700000000000006,0],'useTex':false},{'pos':[-4.450000000000801,39.812500000000036,-66.38749999999897],'rot':[43,58,360],'size':[2.9000000000000496,6.900000000000004,2.60000000000007],'col':[0.34000000000000385,0.1700000000000006,0],'useTex':false},{'pos':[-4.350000000000803,39.812500000000036,-72.23749999999897],'rot':[43,43,360],'size':[2.9000000000000496,6.900000000000004,2.60000000000007],'col':[0.34000000000000385,0.1700000000000006,0],'useTex':false},{'pos':[-2.100000000000805,43.66250000000009,-68.03749999999887],'rot':[0,40,0],'size':[1.3500000000000527,13.24999999999999,2.5000000000000684],'col':[0.34000000000000297,0.1700000000000006,0],'useTex':false},{'pos':[-2.100000000000805,50.01250000000005,-68.03749999999887],'rot':[0,40,0],'size':[6.900000000000057,0.8000000000000002,8.100000000000072],'col':[1.0000000000000029,0.25,1.0000000000000029],'useTex':false},{'pos':[-4.850000000000814,50.01250000000005,-68.03749999999887],'rot':[0,0,32],'size':[6.900000000000057,2.1,8.100000000000072],'col':[1.0000000000000069,0.2500000000000011,1.0000000000000069],'useTex':false},{'pos':[0.04999999999918653,50.36250000000002,-68.03749999999887],'rot':[0,153,146],'size':[6.900000000000057,0.8999999999999998,8.100000000000072],'col':[1.0000000000000109,0.250000000000002,1.0000000000000109],'useTex':false},{'pos':[-1.6500000000008144,50.36250000000002,-65.83749999999883],'rot':[7,35,9],'size':[11.700000000000045,0.8999999999999998,11.700000000000063],'col':[1.0000000000000162,0.2500000000000029,1.0000000000000162],'useTex':false},{'pos':[-1.6500000000008144,50.7125,-71.5874999999989],'rot':[158,7,184],'size':[11.700000000000045,0.8999999999999998,11.700000000000063],'col':[1.000000000000022,0.2500000000000038,1.000000000000022],'useTex':false},{'pos':[-1.5759004250415725,46.840001585340794,-66.91774152316817],'size':[12.049999999999994,13.749999999999984,15.19999999999995],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'particleSystem','particleSystemData':{'pos':[-1.5759004250415725,46.840001585340794,-66.91774152316817],'size':[12.049999999999994,13.749999999999984,15.19999999999995],'minVelX':-0.012500000000000004,'maxVelX':0.012499999999999976,'minVelY':0.012500000000000046,'maxVelY':0.049999999999999975,'minVelZ':-0.012500000000003238,'maxVelZ':0.012499999999999976,'minR':0.9164999999999995,'maxR':1,'minG':0.13950000000000004,'maxG':0.38050000000000217,'minB':0.9345000000000018,'maxB':1,'minLife':36.55000000000001,'maxLife':47.90000000000014,'grav':-0.005000000000000003,'minSize':10,'maxSize':100,'productionRate':2,'batchAmount':1}},{'pos':[0.605355668347947,37.183262858496086,-90.53245703733454],'rot':[0,7,0],'size':[11.149999999999995,2.249999999999999,11.549999999999992],'col':[0.5285712105349101,0.49312988087374987,0.38000000000000234],'useTex':false},{'pos':[-2.9446443316520536,41.73326285849614,-93.98245703733458],'rot':[0,61,0],'size':[5.800000000000004,10.05,6.249999999999999],'col':[0.5285712105349121,0.49312988087375076,0.3800000000000032],'useTex':false},{'pos':[-1.4456448364028387,42.03000158534083,-93.39367669132163],'size':[2.7500000000000133,9.550000000000011,3.5000000000000133],'col':[2,0,0],'rot':[0,59.5,0],'useTex':false,'special':'lava'},{'pos':[0.9933686275777933,38.236030804191934,-91.93238411855359],'size':[2.7499999999999973,1,11.299999999999972],'col':[1.9999999999999998,0,0],'rot':[0,59,0],'useTex':false,'special':'lava'},{'pos':[6.344515518028765,36.30593202868035,-90.16199528270208],'size':[0.2124999999999998,4.687500000000008,0.24999999999999967],'col':[2,0,0],'rot':[0,61.25,0],'useTex':false,'special':'lava'},{'pos':[0.8016850515792496,37.94000158534086,-87.45458712285266],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'sword','pos':[0.8016850515792496,37.94000158534086,-87.45458712285266],'rot':[0,0,0]}},{'pos':[-3.2596103937802052,47.06000158534093,-94.44678812842683],'size':[1,1.600000000000004,1],'col':[0,0,0],'rot':[0,0,0],'useTex':false,'render':false,'special':'particleSystem','particleSystemData':{'pos':[-3.2596103937802052,47.06000158534093,-94.44678812842683],'size':[1,1.600000000000004,1],'minVelX':-0.49999999999999994,'maxVelX':0.49999999999999994,'minVelY':0.5000000000000001,'maxVelY':0.6,'minVelZ':-0.49999999999999994,'maxVelZ':0.49999999999999994,'minR':0.8755000000000009,'maxR':1,'minG':0.12600000000000003,'maxG':0.8019999999999998,'minB':0,'maxB':0,'minLife':26.99999999999996,'maxLife':41.200000000000145,'grav':-0.07425000000000005,'minSize':62,'maxSize':152,'productionRate':2,'batchAmount':1}},{'pos':[16.435414915347906,41.671104122292505,-95.5395405980293],'rot':[0,0,211],'size':[13.049999999999988,1,2.5999999999999988],'col':[0.4481299950759734,0,0]},{'pos':[28.210414915347908,44.996104122292664,-95.5395405980293],'rot':[0,0,0],'size':[13,1,13],'col':[0.4481299950759752,0,0]},{'pos':[31.510414915347877,45.083604122292684,-93.38954059802931],'rot':[0,19,0],'size':[4.150000000000013,1,7.400000000000017],'col':[1.0000000000000033,1.0000000000000033,1.0000000000000033],'useTex':false},{'pos':[33.96041491534816,45.083604122292684,-87.73954059802924],'rot':[0,0,0],'size':[12,1,12],'col':[1.0000000000000064,1.0000000000000064,1.0000000000000064],'useTex':false},{'pos':[30.910414915348113,46.883604122292454,-87.73954059802924],'rot':[65,151,0],'size':[3.70000000000001,2.0500000000000007,3.8500000000000227],'col':[0.3400000000000012,0.3500000000000012,0.3525000000000016],'useTex':false},{'pos':[30.5229149153482,48.633604122292354,-87.08954059802927],'rot':[65,151,0],'size':[3.70000000000001,2.0500000000000007,0.7000000000000282],'col':[1.000000000000002,1.000000000000002,1.000000000000002],'useTex':false},{'pos':[30.61549438549598,46.36000158534103,-95.57387312132875],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'lantern','pos':[30.61549438549598,46.36000158534103,-95.57387312132875],'rot':[0,0,0]}},{'pos':[23.450279367227996,46.438391238568364,-95.79828488241387],'rot':[0,0,0],'size':[0.2,0.2,0.2],'col':[0.40000000000000213,0.40000000000000213,0.40000000000000213],'useTex':false,'partInfo':{'instance':'weapon','type':'banana','pos':[23.450279367227996,46.438391238568364,-95.79828488241387],'rot':[0,0,0]}},{'pos':[34.00092460732545,47.41000158534095,-83.85589199166174],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.900000000000005],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[34.00092460732545,47.41000158534095,-83.85589199166174],'weapon':'bow'}},{'pos':[37.34997286176912,47.5305957773121,-91.75640590637529],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000055],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[37.34997286176912,47.5305957773121,-91.75640590637529],'weapon':'lantern'}},{'pos':[34.052933822186816,42.62551158598803,-70.20896318284545],'size':[10.999999999999998,1,16.04999999999998],'col':[2,0,0],'rot':[0,0,0],'useTex':false,'special':'lava'},{'pos':[31.30038884617421,43.08000158534106,-76.43376532204503],'rot':[24,8,16],'size':[3.7499999999999996,2.05,2.3000000000000096],'col':[0.21741157907080133,1.0000000000000022,0.3939800873035597]},{'pos':[36.500388846174346,43.08000158534106,-73.78376532204491],'rot':[52,20,124],'size':[2.7499999999999982,4.300000000000002,2.3000000000000096],'col':[0.21741157907080133,1.0000000000000069,0.3939800873035606]},{'pos':[33.150388846174295,43.08000158534106,-66.88376532204501],'rot':[102,122,130],'size':[2.7499999999999982,4.300000000000002,2.3000000000000096],'col':[0.21741157907080133,1.0000000000000113,0.3939800873035615]},{'pos':[34,42.41250000000007,-56.137499999998454],'rot':[0,0,0],'size':[8,2,9],'col':[0.35000000000005405,0.3325000000000662,0.3450000000000717]},{'pos':[34,47.4125000000001,-52.237499999998406],'rot':[0,0,0],'size':[8,11,1],'col':[0.35000000000005405,0.3325000000000662,0.3450000000000717]},{'pos':[34,38.012500000000024,-43.987499999998334],'rot':[0,0,0],'size':[8,2,9],'col':[0.3500000000000558,0.33250000000006796,0.34500000000007347]},{'pos':[40.350000000000136,40.812500000000064,-30.037499999998044],'rot':[0,0,0],'size':[2,12,8],'col':[0.35000000000000653,0.34000000000000474,0.35000000000000014]},{'pos':[28.600000000000026,40.812500000000064,-22.837499999998073],'rot':[0,0,0],'size':[2,12,8],'col':[0.33000000000001095,0.3200000000000074,0.33499999999999985]},{'pos':[40.35000000000004,40.812500000000064,-14.537499999998087],'rot':[0,0,0],'size':[2,12,8],'col':[0.390000000000015,0.3400000000000097,0.330000000000001]},{'pos':[34,38.012500000000024,-1.5374999999982355],'rot':[0,0,0],'size':[8,2,9],'col':[0.3500000000000594,0.3325000000000715,0.345000000000077]},{'pos':[40.445285383804034,49.50000158534096,-11.705249826799278],'size':[0.75,1.325,0.75],'col':[0.09999999999999978,0.3000000000000025,0.9000000000000095],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[40.445285383804034,49.50000158534096,-11.705249826799278],'weapon':'ball'}},{'pos':[37.53227152567529,42.005001585340814,-1.451422609072815],'size':[0.39999999999999997,6.850000000000001,9.300000000000013],'col':[0.1499999999999999,0.40000000000000213,1.0000000000000084],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[34.05027786605218,41.50500158534076,2.585117337719271],'size':[7.6999999999999975,7.750000000000004,0.39999999999999963],'col':[0.14999999999999974,0.4000000000000016,1.0000000000000089],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[30.555923991336165,41.590623796879306,-1.7852432388852042],'size':[0.37499999999999967,7.650000000000002,8.69999999999999],'col':[0.14999999999999974,0.4000000000000008,1.0000000000000044],'rot':[0,0,0],'useTex':false,'special':'glass'},{'pos':[34,38.012500000000024,13.81250000000175],'rot':[0,0,0],'size':[8,2,9],'col':[0.35000000000006115,0.3325000000000733,0.3450000000000788]},{'pos':[34.48750017644566,42.105623796879364,14.12895771387399],'size':[0.75,1.325,0.75],'col':[0.09999999999999987,0.30000000000000204,0.9000000000000055],'rot':[0,0,0],'useTex':false,'partInfo':{'instance':'enemy','pos':[34.48750017644566,42.105623796879364,14.12895771387399],'weapon':'ball'}},{'pos':[34,40.2124999999999,27.1625000000017],'rot':[150,0,0],'size':[8,2,9],'col':[0.4400000000000621,0,0]}]#[-4.3000000000000025,60.60000000000031,-23.59999999999995]#[0,0,24]#[34.149999999999906,44.89999999999941,38.749999999999986]#[0,-2,16]"
]

let currentLevel=0

function setLevel(level){
    
    player.levelTime=0
    player.grounded=true
    
    player.scoping=false
    player.setProjectionMatrixFOV(player.fov)
    
    weapons.banana.flying=false
    weapons.banana.render=true
    weapons.reverse.reset()
    weapons.grapplingHook.active=false
    player.isHolding=false
    
    if(typeof levels[level]==='string'){
        
        let _input=levels[level].split('#')
        
        //retrieve level geometry & objects
        let func=Object.constructor('return '+_input[0]+';'),
            _levelData=func()
        
        //retrieve light position
        func=Object.constructor('return'+_input[1])
        let _lightPos=func()
        
        //retrieve spawn position
        func=Object.constructor('return'+_input[2])
        let _spawnPos=func()
        
        //retrieve milk position
        func=Object.constructor('return'+_input[3])
        let _milkPos=func()
        
        func=Object.constructor('return '+_input[4])
        let _billyPos=func()
        
        levels[level]=loadLevelFromData(_levelData,_lightPos,_spawnPos,_milkPos,_billyPos)
        
    }
    
    if(!levels[level].addLines){
        
        levels[level].addLines=()=>{}
    }
    
    let verts=[],index=[]
    
    function addBoard(x,y,z,s,r,m){
        
        let [ox,oy,x2,y2]=textures.messages.bounds[m],w=x2*s,h=y2*s
        
        let vl=verts.length/5
        
        verts.push(x-w,y+h,z,ox,oy,
                    x-w,y-h,z,ox,y2+oy,
                    x+w,y-h,z,x2+ox,y2+oy,
                    x+w,y+h,z,x2+ox,oy)
                    
        index.push(vl,vl+1,vl+2,vl+2,vl+3,vl)
        
        if(r){
            
            for(let i=vl*5;i<verts.length;i+=5){
                
                let _r=vec3.rotateY([],[verts[i],verts[i+1],verts[i+2]],[x,y,z],r*MATH.TO_RAD)
                verts[i]=_r[0]
                verts[i+1]=_r[1]
                verts[i+2]=_r[2]
            }
        }
    }
    
    switch(level+1){
        
        case 1:
            
            addBoard(0,0.25,13,10,0,0)
            addBoard(0,0.25,0,10,0,1)
            addBoard(45.656,0.25,5,10,180,2)
            addBoard(15,0.25,-29,10,292,5)
            addBoard(0,-7,15,10,0,7)
            
        break
        
        case 2:
            
            addBoard(0,0,15,10,0,3)
            addBoard(-16,20,7,10,90,4)
            
        break
        
        case 3:
            
            addBoard(0,0,15,10,0,6)
            
        break
        
        case 25:
            
            addBoard(34.15,50,42,17,180,8)
            
        break
        
    }
    
    if(verts.length){
        
        levelBoard.draw=true
        gl.bindBuffer(gl.ARRAY_BUFFER,levelBoard.vertBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.STATIC_DRAW)
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,levelBoard.indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(index),gl.STATIC_DRAW)
        
        levelBoard.indexAmount=index.length
        
    } else {
        
        levelBoard.draw=false
    }
    
    for(let j in levels){
        
        for(let k in levels[j].updatedBodies){
            
            levels[j].updatedBodies[k].die(k,j)
        }
    }
    
    // for(let j in levels[level].updatedBodies){
        
    //     levels[level].updatedBodies[j].die(j)
    // }
    
    player.currentWeapon='hand'
    gl.useProgram(dynamicGeometryProgram)
    gl.uniform3f(glCache.dynamic_lightPos,...levels[level].lightPos)
    gl.useProgram(weaponRendererProgram)
    gl.uniform3f(glCache.weapon_lightPos,...levels[level].lightPos)
    gl.useProgram(staticGeometryProgram)
    gl.uniform3f(glCache.static_lightPos,...levels[level].lightPos)
    
    for(let i in physicsWorld.bodies){
        
        if(physicsWorld.bodies[i].collisionFilterGroup===PLAYER_PHYSICS_GROUP){continue}
        
        physicsWorld.removeBody(physicsWorld.bodies[i])
    }
    
    player.body.position.set(...levels[level].spawnPos)
    player.body.velocity.setZero()
    player.body.angularVelocity.setZero()
    player.yaw=player.pitch=0
    currentLevel=level
    levelMesh.makeMesh(levels[level].data)
    levelMesh.setBuffers()
    levels[level].updatedBodies=[]
    levels[level].updatedParticleSystems=[]
    
    for(let i in levels[level].glass){
        
        levels[level].updatedBodies.push(new PhysicsGlass(levels[level].glass[i]))
    }
    
    for(let i in levels[level].lava){
        
        levels[level].updatedBodies.push(new PhysicsLava(levels[level].lava[i]))
    }
    
    for(let i in levels[level].particleSystems){
        
        levels[level].updatedParticleSystems.push(new ParticleSystem(levels[level].particleSystems[i].particleSystemData))
    }
    
    for(let i in physicsObjects.constraints){
        
        physicsWorld.removeConstraint(physicsObjects.constraints[i])
    }
    physicsObjects.constraints=[]
    
    for(let i in physicsObjects.objects){
        
        if(physicsObjects.objects[i].body){
            
            physicsWorld.removeBody(physicsObjects.objects[i].body)
        }
    }
    
    physicsObjects.objects=[]
    
    for(let i=0,l=levels[level].init.length;i<l;i+=2){
        
        physicsObjects.add(new levels[level].init[i](levels[level].init[i+1]))
    }
    
    ParticleRenderer.particles=[]
    
    ctx.font='20px cursive'
    
    if(levels[level].billyPos){
            
        physicsObjects.add(new PhysicsBilly({
            
            pos:levels[level].billyPos
        }))
    }
    
    player.timeTimer=0
}

let levelMesh=new Mesh(),levelBoard={vertBuffer:gl.createBuffer(),indexBuffer:gl.createBuffer(),draw:false}

setLevel(currentLevel)

let MILK_MATRIX=new Float32Array(MATH.IDENTITY_MATRIX),frameCount=0

let scopingGradient=ctx.createRadialGradient(300,300,250,300,300,300)

scopingGradient.addColorStop(.7,'rgb(0,0,0,0)')
scopingGradient.addColorStop(1,'black')

gl.useProgram(staticGeometryProgram)
gl.uniform1f(glCache.static_alpha,1)

let scenes={},currentScene='title'

ctx.clearRect(0,0,width,height)

function coolText(str,x,y){
    
    ctx.fillText(str,x,y)
    ctx.strokeText(str,x,y)
}

function button(_x,_y,x,y,w,h){
    
    let __x=_x*600/width,__y=_y*600/height
    return __x>x&&__x<x+w&&__y>y&&__y<y+h
}

function button_center(_x,_y,x,y,w,h){
    
    w>>=1
    h>>=1
    y-=5
    
    let __x=_x*600/width,__y=_y*600/height
    
    return __x>x-w&&__x<x+w&&__y>y-h&&__y<y+h
}

function numberSlider(num,min,max,int,click){
    
    int*=user.keys.z?0.25:user.keys.a?4:1
    
    if(user[click?'clickedKeys':'keys'].o){
        
        num=Math.min(num+int,max)
        
    } else if(user[click?'clickedKeys':'keys'].l){
        
        num=Math.max(num-int,min)
    }
    
    return user.keys.r?Math.round(num):num
}

uiCanvas.onmousemove=function(e){
    
    user.mouseX=e.x
    user.mouseY=e.y
}

let titleScreenMesh=new Mesh()
titleScreenMesh.makeMesh([
    
    {pos:[0.5,0,-9],size:[25,1,25],col:[0.1,0.1,0.1],rot:[0,180,0]},
    {pos:[4,5.75,-11.5],size:[1,10,25],col:[0.2,0.2,0.2],rot:[0,0,0]},
    {pos:[0.5,5.75,-11],size:[25,10,1],col:[0.1,0.1,0.1],rot:[0,0,0]},
    {pos:[0,1,-7],size:[1.5,1.5,1.5],col:[0.5,0.5,0.5],rot:[0,0,0],useTex:false},
    {pos:[-3,1,-7],size:[1,1,1],col:[0.4,0.4,0.4],rot:[0,0,0],useTex:false},
    {pos:[-3,1,-6.99],size:[0.95,0.95,1],col:[0,0,0],rot:[0,0,0],useTex:false},
    {pos:[-2.75,1.25,-6.95],size:[0.1,0.1,1],col:[0,10,0],rot:[0,0,0],useTex:false},
    {pos:[-3.25,1.25,-6.95],size:[0.1,0.1,1],col:[0,10,0],rot:[0,0,0],useTex:false},
    {pos:[-3,0.8,-6.95],size:[0.3,0.05,1],col:[0,10,0],rot:[0,0,0],useTex:false},
    {pos:[-3.15,0.825,-6.95],size:[0.1,0.05,1],col:[0,10,0],rot:[0,0,-45],useTex:false},
    {pos:[-2.85,0.825,-6.95],size:[0.1,0.05,1],col:[0,10,0],rot:[0,0,45],useTex:false},
    {pos:[-3.5,0.6,-6.4],size:[0.2,0.2,1.5],col:[0.4,0.4,0.4],rot:[0,-30,0],useTex:false},
    {pos:[-2.5,0.6,-6.4],size:[0.2,0.2,1.5],col:[0.4,0.4,0.4],rot:[0,30,0],useTex:false},
    
],false)
titleScreenMesh.setBuffers()

function initTitleScreen(){
    
    player.setProjectionMatrixFOV(player.fov)
    gl.useProgram(staticGeometryProgram)
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    player.height=player._height
    player.body.position.set(-3,2,-2)
    player.yaw=-0.4
    player.pitch=-0.1
    player.cosPitch=Math.cos(-player.pitch)
    player.sinPitch=Math.sin(-player.pitch)
    player.cosYaw=Math.cos(-player.yaw)
    player.sinYaw=Math.sin(-player.yaw)
    player.updateCameraMatrices()
    
    gl.uniform3f(glCache.static_lightPos,2,3,-3)
    gl.uniform3f(glCache.static_playerPos,player.body.position.x,player.body.position.y+player.height,player.body.position.z)
    
    gl.useProgram(dynamicGeometryProgram)
    gl.uniformMatrix4fv(glCache.dynamic_viewMatrix,gl.FALSE,player.viewMatrix)
    gl.uniform3f(glCache.dynamic_lightPos,0,0,0)
    gl.uniform3f(glCache.dynamic_playerPos,player.body.position.x,player.body.position.y+player.height,player.body.position.z)
}

initTitleScreen()

let titleScreenVignetteGradient=ctx.createRadialGradient(300,300,0,300,300,300)

titleScreenVignetteGradient.addColorStop(1,'rgba(0,0,0,0.9)')
titleScreenVignetteGradient.addColorStop(0,'rgba(0,0,0,0)')

let levelCreatorGradient=ctx.createLinearGradient(0,0,600,0)

levelCreatorGradient.addColorStop(440/600,'rgb(0,0,0,0)')
levelCreatorGradient.addColorStop(460/600,'rgb(50,50,50)')

scenes.title=function(){
    
    if(player.useBloom){
        
        gl.bindFramebuffer(gl.FRAMEBUFFER,og_fb)
    }
    
    gl.clearColor(backgroundColor[0],backgroundColor[1],backgroundColor[2],backgroundColor[3])
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    
    gl.useProgram(skyRendererProgram)
    
    let _v=[player.body.position.x+skySunDir[0],player.body.position.y+skySunDir[1],player.body.position.z+skySunDir[2],1]
    
    vec4.transformMat4(_v,_v,player.viewMatrix)
    vec4.scale(_v,_v,1/_v[3])
    
    let xPos=_v[0],yPos=_v[1]
    
    gl.uniform2f(glCache.sky_translation,xPos,yPos)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,skyVertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,skyIndexBuffer)
    gl.vertexAttribPointer(glCache.sky_vertPos,2,gl.FLOAT,gl.FALSE,12,0)
    gl.vertexAttribPointer(glCache.sky_vertIsSun,1,gl.FLOAT,gl.FALSE,12,8)
    gl.drawElements(gl.TRIANGLES,skyIndex.length,gl.UNSIGNED_SHORT,0)
    
    gl.useProgram(staticGeometryProgram)
    titleScreenMesh.render()
    
    gl.useProgram(dynamicGeometryProgram)
    
    let f=TIME*0.1,c=Math.cos(f),s=Math.sin(f),axis=[c,c*s,s]
    
    mat4.fromRotation(MILK_MATRIX,f,axis)
    MILK_MATRIX[12]=0
    MILK_MATRIX[13]=3
    MILK_MATRIX[14]=-7
    
    gl.bindVertexArray(meshes.milk.VAO)
    gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,MILK_MATRIX)
    gl.drawElements(gl.TRIANGLES,meshes.milk.indexAmount,gl.UNSIGNED_SHORT,0)
    gl.bindVertexArray(null)
    
    if(player.useBloom){
        
        gl.bindBuffer(gl.ARRAY_BUFFER,screenVertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,screenIndexBuffer)
        gl.vertexAttribPointer(glCache.postprocessingScreenVerts,2,gl.FLOAT,gl.FALSE,8,0)
        
        if(player.lookDir[0]*skySunDir[0]+player.lookDir[1]*skySunDir[1]+player.lookDir[2]*skySunDir[2]>0){
        
            gl.useProgram(sunRayProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,sunray_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
            gl.uniform2f(glCache.sunray_sunPos,_v[0],_v[1])
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        if(player.useSSAO||currentSuperSecretShader===1){
                
            gl.useProgram(ssaoProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,ssao_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_normal)
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        gl.useProgram(bloomFilterProgram)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.bindFramebuffer(gl.FRAMEBUFFER,filtered_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurHorProgram)
        gl.bindTexture(gl.TEXTURE_2D,filtered_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_hor_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurVerProgram)
        gl.bindTexture(gl.TEXTURE_2D,blurred_hor_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_ver_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomCombineProgram)
        gl.bindFramebuffer(gl.FRAMEBUFFER,fxaa_fb)
        gl.activeTexture(gl.TEXTURE4)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.activeTexture(gl.TEXTURE3)
        gl.bindTexture(gl.TEXTURE_2D,blurred_ver_tex)
        gl.activeTexture(gl.TEXTURE2)
        gl.bindTexture(gl.TEXTURE_2D,sunray_tex)
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,ssao_tex)
        gl.uniform1i(glCache.bloomCombine_ogTex,4)
        gl.uniform1i(glCache.bloomCombine_bloomTex,3)
        gl.uniform1i(glCache.bloomCombine_sunrayTex,2)
        gl.uniform1i(glCache.bloomCombine_infoTex,1)
        gl.uniform1i(glCache.bloomCombine_ssaoTex,0)
        gl.uniform1f(glCache.bloomCombine_time,frameCount)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(fxaaProgram)
        gl.bindTexture(gl.TEXTURE_2D,fxaa_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,null)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    
    if(player.useMotionBlur){
        
        ctx.globalAlpha=0.4
        ctx.drawImage(gl.canvas,0,0,600,600)
        ctx.globalAlpha=1
        
    } else {
        
        ctx.drawImage(gl.canvas,0,0,600,600)
    }
    
    ctx.fillStyle=titleScreenVignetteGradient
    ctx.fillRect(0,0,600,600)
    
    ctx.lineWidth=3.5
    ctx.strokeStyle='rgb(255,0,0)'
    ctx.fillStyle='rgb(255,255,255)'
    
    ctx.font='bold 80px cursive'
    coolText('Karlson',150,130)
    
    if(button(user.mouseX,user.mouseY,70,220,150,75)){
        
        ctx.fillStyle='rgb(150,150,150)'
        
        if(user.mouseClicked){
            
            currentScene='levelSelect'
            
            return
        }
    }
    ctx.lineWidth=3
    ctx.font='bold 55px cursive'
    coolText('Play',90,270)
    
    ctx.fillStyle='rgb(255,255,255)'
    ctx.lineWidth=2
    ctx.font='bold 40px cursive'
    if(button(user.mouseX,user.mouseY,30,320,250,50)){
        
        ctx.fillStyle='rgb(150,150,150)'
        
        if(user.mouseClicked){
            
            currentScene='options'
            return
        }
    }
    coolText('Options',70,360)
    
    ctx.fillStyle='rgb(255,255,255)'
    if(button(user.mouseX,user.mouseY,30,410,250,50)){
        
        ctx.fillStyle='rgb(150,150,150)'
        
        if(user.mouseClicked){
            
            currentScene='levelCreator'
            ctx.fillStyle='rgb(0,0,0)'
            
            player.body.position.set(0,0,10)
            player.yaw=0
            player.pitch=0
            player.cosPitch=Math.cos(-player.pitch)
            player.sinPitch=Math.sin(-player.pitch)
            player.cosYaw=Math.cos(-player.yaw)
            player.sinYaw=Math.sin(-player.yaw)
            
            uiCanvas.onmousemove=function(e){
                
                user.mouseX=e.x
                user.mouseY=e.y
                
                if(user.mousePressed && user.mouseX<450*width/600){
                    
                    player.yaw-=e.movementX*player.sensitivity
                    player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
                    
                    player.cosPitch=Math.cos(-player.pitch)
                    player.sinPitch=Math.sin(-player.pitch)
                    player.cosYaw=Math.cos(-player.yaw)
                    player.sinYaw=Math.sin(-player.yaw)
                }
                
            }
            
            uiCanvas.onmousedown=function(e){
            
                user.mousePressed=true
                user.mouseClicked=true
                user.mouseButton=e.button
            }
        }
    }
    ctx.font='bold 35px cursive'
    coolText('Level Creator',40,450)
    
}

scenes.levelSelect=function(){
    
    if(user.mouseClicked && button(user.mouseX,user.mouseY,0,0,85,55)){
        
        loadLevelDataButton.addEventListener('click',function(){
            
            enterLevelDataPage.style.display='none'
            
            let _input=levelDataInput.value.split('#')
            
            //retrieve level geometry & objects
            let func=Object.constructor('return '+_input[0]+';'),
                _levelData=func()
            
            //retrieve light position
            func=Object.constructor('return'+_input[1])
            let _lightPos=func()
            
            //retrieve spawn position
            func=Object.constructor('return'+_input[2])
            let _spawnPos=func()
            
            //retrieve milk position
            func=Object.constructor('return'+_input[3])
            let _milkPos=func()
            
            func=Object.constructor('return '+_input[4])
            let _billyPos=func()
            
            levels[-1]=loadLevelFromData(_levelData,_lightPos,_spawnPos,_milkPos,_billyPos)
            setLevel(-1)
            currentScene='play'
            uiCanvas.requestPointerLock()
            ctx.strokeStyle='black'
            ctx.lineWidth=2
            
            uiCanvas.onmousemove=function(e){
                
                user.mouseX=e.x
                user.mouseY=e.y
                
                player.yaw-=e.movementX*player.sensitivity
                player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
            }
            
            uiCanvas.onmousedown=function(e){
            
                user.mousePressed=true
                user.mouseClicked=true
                uiCanvas.requestPointerLock()
                user.mouseButton=e.button
            }
            
            user.mousePressed=false
            user.mouseClicked=false
        })

        enterLevelDataPage.style.display='block'
        currentScene='enterLevelData'
        return
    }
    
    if(player.useBloom){
        
        gl.bindFramebuffer(gl.FRAMEBUFFER,og_fb)
    }
    
    gl.clearColor(backgroundColor[0],backgroundColor[1],backgroundColor[2],backgroundColor[3])
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    
    gl.useProgram(skyRendererProgram)
    
    let _v=[player.body.position.x+skySunDir[0],player.body.position.y+skySunDir[1],player.body.position.z+skySunDir[2],1]
    
    vec4.transformMat4(_v,_v,player.viewMatrix)
    vec4.scale(_v,_v,1/_v[3])
    
    let xPos=_v[0],yPos=_v[1]
    
    gl.uniform2f(glCache.sky_translation,xPos,yPos)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,skyVertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,skyIndexBuffer)
    gl.vertexAttribPointer(glCache.sky_vertPos,2,gl.FLOAT,gl.FALSE,12,0)
    gl.vertexAttribPointer(glCache.sky_vertIsSun,1,gl.FLOAT,gl.FALSE,12,8)
    gl.drawElements(gl.TRIANGLES,skyIndex.length,gl.UNSIGNED_SHORT,0)
    
    gl.useProgram(staticGeometryProgram)
    titleScreenMesh.render()
    
    gl.useProgram(dynamicGeometryProgram)
    
    let f=TIME*0.1,c=Math.cos(f),s=Math.sin(f),axis=[c,c*s,s]
    
    mat4.fromRotation(MILK_MATRIX,f,axis)
    MILK_MATRIX[12]=0
    MILK_MATRIX[13]=3
    MILK_MATRIX[14]=-7
    
    gl.bindVertexArray(meshes.milk.VAO)
    gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,MILK_MATRIX)
    gl.drawElements(gl.TRIANGLES,meshes.milk.indexAmount,gl.UNSIGNED_SHORT,0)
    gl.bindVertexArray(null)
    
    if(player.useBloom){
        
        gl.bindBuffer(gl.ARRAY_BUFFER,screenVertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,screenIndexBuffer)
        gl.vertexAttribPointer(glCache.postprocessingScreenVerts,2,gl.FLOAT,gl.FALSE,8,0)
        
        if(player.lookDir[0]*skySunDir[0]+player.lookDir[1]*skySunDir[1]+player.lookDir[2]*skySunDir[2]>0){
        
            gl.useProgram(sunRayProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,sunray_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
            gl.uniform2f(glCache.sunray_sunPos,_v[0],_v[1])
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        if(player.useSSAO||currentSuperSecretShader===1){
                
            gl.useProgram(ssaoProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,ssao_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_normal)
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        gl.useProgram(bloomFilterProgram)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.bindFramebuffer(gl.FRAMEBUFFER,filtered_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurHorProgram)
        gl.bindTexture(gl.TEXTURE_2D,filtered_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_hor_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurVerProgram)
        gl.bindTexture(gl.TEXTURE_2D,blurred_hor_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_ver_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomCombineProgram)
        gl.bindFramebuffer(gl.FRAMEBUFFER,fxaa_fb)
        gl.activeTexture(gl.TEXTURE4)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.activeTexture(gl.TEXTURE3)
        gl.bindTexture(gl.TEXTURE_2D,blurred_ver_tex)
        gl.activeTexture(gl.TEXTURE2)
        gl.bindTexture(gl.TEXTURE_2D,sunray_tex)
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,ssao_tex)
        gl.uniform1i(glCache.bloomCombine_ogTex,4)
        gl.uniform1i(glCache.bloomCombine_bloomTex,3)
        gl.uniform1i(glCache.bloomCombine_sunrayTex,2)
        gl.uniform1i(glCache.bloomCombine_infoTex,1)
        gl.uniform1i(glCache.bloomCombine_ssaoTex,0)
        gl.uniform1f(glCache.bloomCombine_time,frameCount)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(fxaaProgram)
        gl.bindTexture(gl.TEXTURE_2D,fxaa_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,null)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    
    if(player.useMotionBlur){
        
        ctx.globalAlpha=0.4
        ctx.drawImage(gl.canvas,0,0,600,600)
        ctx.globalAlpha=1
        
    } else {
        
        ctx.drawImage(gl.canvas,0,0,600,600)
    }
    
    ctx.fillStyle=titleScreenVignetteGradient
    ctx.fillRect(0,0,600,600)
    
    ctx.lineWidth=3.5
    ctx.strokeStyle='rgb(255,0,0)'
    ctx.fillStyle='rgb(255,255,255)'
    
    ctx.font='bold 30px cursive'
    ctx.textAlign='center'
    coolText('Level Select',300,50)
    ctx.strokeStyle='black'
    ctx.font='bold 12px cursive'
    ctx.fillStyle='white'
    ctx.fillText('Press "B" to go back to the title screen',125,585)
    ctx.font='bold 22px cursive'
    
    for(let i=0,l=levels.length;i<l;i++){
        
        let x=~~(i%5)*100+100,y=(~~(i*MATH.RECIP_5))*100+125,w=60,h=60,c=Math.max(Math.sin((TIME+(l-i)*10)*0.4)*95+170,170)
        
        ctx.fillStyle='rgb('+c+','+c+','+c+')'
        ctx.fillRect(x-(w>>1),y-(h>>1),w,h)
        ctx.strokeRect(x-(w>>1),y-(h>>1),w,h)
        ctx.fillStyle='black'
        ctx.fillText(i+1,x,y+5)
        
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,x,y,w,h)){
            
            setLevel(i)
            currentScene='play'
            ctx.strokeStyle='black'
            ctx.lineWidth=2
            
            uiCanvas.onmousemove=function(e){
                
                user.mouseX=e.x
                user.mouseY=e.y
                
                player.yaw-=e.movementX*player.sensitivity
                player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
            }
            
            uiCanvas.onmousedown=function(e){
            
                user.mousePressed=true
                user.mouseClicked=true
                uiCanvas.requestPointerLock()
                user.mouseButton=e.button
            }
            uiCanvas.requestPointerLock()
            
            return
        }
    }
    
    ctx.fillStyle='rgb(200,200,200)'
    ctx.fillRect(5,5,85,55)
    ctx.strokeRect(5,5,85,55)
    ctx.font='17px cursive'
    ctx.fillStyle='black'
    ctx.fillText('Input',42.5,27)
    ctx.fillText('code',42.5,47)
    
    if(user.keys.b){
        
        ctx.textAlign='start'
        currentScene='title'
    }
}

scenes.options=function(){
    
    if(player.useBloom){
        
        gl.bindFramebuffer(gl.FRAMEBUFFER,og_fb)
    }
    
    gl.clearColor(backgroundColor[0],backgroundColor[1],backgroundColor[2],backgroundColor[3])
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    
    gl.useProgram(skyRendererProgram)
    
    let _v=[player.body.position.x+skySunDir[0],player.body.position.y+skySunDir[1],player.body.position.z+skySunDir[2],1]
    
    vec4.transformMat4(_v,_v,player.viewMatrix)
    vec4.scale(_v,_v,1/_v[3])
    
    let xPos=_v[0],yPos=_v[1]
    
    gl.uniform2f(glCache.sky_translation,xPos,yPos)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,skyVertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,skyIndexBuffer)
    gl.vertexAttribPointer(glCache.sky_vertPos,2,gl.FLOAT,gl.FALSE,12,0)
    gl.vertexAttribPointer(glCache.sky_vertIsSun,1,gl.FLOAT,gl.FALSE,12,8)
    gl.drawElements(gl.TRIANGLES,skyIndex.length,gl.UNSIGNED_SHORT,0)
    
    gl.useProgram(staticGeometryProgram)
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    titleScreenMesh.render()
    
    gl.useProgram(dynamicGeometryProgram)
    
    let f=TIME*0.1,c=Math.cos(f),s=Math.sin(f),axis=[c,c*s,s]
    
    mat4.fromRotation(MILK_MATRIX,f,axis)
    MILK_MATRIX[12]=0
    MILK_MATRIX[13]=3
    MILK_MATRIX[14]=-7
    
    gl.bindVertexArray(meshes.milk.VAO)
    gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,MILK_MATRIX)
    gl.drawElements(gl.TRIANGLES,meshes.milk.indexAmount,gl.UNSIGNED_SHORT,0)
    gl.bindVertexArray(null)
    
    if(player.useBloom){
        
        gl.bindBuffer(gl.ARRAY_BUFFER,screenVertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,screenIndexBuffer)
        gl.vertexAttribPointer(glCache.postprocessingScreenVerts,2,gl.FLOAT,gl.FALSE,8,0)
        
        if(player.lookDir[0]*skySunDir[0]+player.lookDir[1]*skySunDir[1]+player.lookDir[2]*skySunDir[2]>0){
        
            gl.useProgram(sunRayProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,sunray_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
            gl.uniform2f(glCache.sunray_sunPos,_v[0],_v[1])
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        if(player.useSSAO||currentSuperSecretShader===1){
                
            gl.useProgram(ssaoProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,ssao_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_normal)
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        gl.useProgram(bloomFilterProgram)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.bindFramebuffer(gl.FRAMEBUFFER,filtered_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurHorProgram)
        gl.bindTexture(gl.TEXTURE_2D,filtered_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_hor_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurVerProgram)
        gl.bindTexture(gl.TEXTURE_2D,blurred_hor_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_ver_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomCombineProgram)
        gl.bindFramebuffer(gl.FRAMEBUFFER,fxaa_fb)
        gl.activeTexture(gl.TEXTURE4)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.activeTexture(gl.TEXTURE3)
        gl.bindTexture(gl.TEXTURE_2D,blurred_ver_tex)
        gl.activeTexture(gl.TEXTURE2)
        gl.bindTexture(gl.TEXTURE_2D,sunray_tex)
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,ssao_tex)
        gl.uniform1i(glCache.bloomCombine_ogTex,4)
        gl.uniform1i(glCache.bloomCombine_bloomTex,3)
        gl.uniform1i(glCache.bloomCombine_sunrayTex,2)
        gl.uniform1i(glCache.bloomCombine_infoTex,1)
        gl.uniform1i(glCache.bloomCombine_ssaoTex,0)
        gl.uniform1f(glCache.bloomCombine_time,frameCount)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(fxaaProgram)
        gl.bindTexture(gl.TEXTURE_2D,fxaa_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,null)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
    }
    
    
    // the click detection for the toggle SSAO button moved here to stop the flashing when turned off/on
    //the SSAO texture has to be re-rendered,this time without anything occluding anything else,cause the empty texture has the same "normals",so it doesn't save and mess things up
    if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,150,500-40,60,30)&&player.useBloom){player.useSSAO=!player.useSSAO;}
    
    if(!player.useSSAO&&currentSuperSecretShader!==1){
        
        gl.useProgram(ssaoProgram);gl.bindFramebuffer(gl.FRAMEBUFFER,ssao_fb);gl.bindTexture(gl.TEXTURE_2D,empty_ssao_normal_tex);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);gl.bindFramebuffer(gl.FRAMEBUFFER,null)
    }
    
    if(player.useMotionBlur){
        
        ctx.globalAlpha=0.4
        ctx.drawImage(gl.canvas,0,0,600,600)
        ctx.globalAlpha=1
        
    } else {
        
        ctx.drawImage(gl.canvas,0,0,600,600)
    }
    
    ctx.fillStyle=titleScreenVignetteGradient
    ctx.fillRect(0,0,600,600)
    ctx.fillStyle='rgba(0,0,0,0.5)'
    ctx.fillRect(0,0,600,600)
    
    ctx.lineWidth=3.5
    ctx.strokeStyle='rgb(255,0,0)'
    ctx.fillStyle='rgb(255,255,255)'
    
    ctx.font='bold 42px cursive'
    ctx.textAlign='center'
    coolText('Options',300,50)
    ctx.font='bold 15px cursive'
    ctx.fillStyle='white'
    ctx.fillText('Press "B" to go back to the title screen',150,590)
    ctx.font='bold 12px cursive'
    ctx.fillText('(Advanced graphics required)',150,470-40)
    ctx.fillText('(Advanced graphics required)',450,290-40)
    ctx.font='bold 27px cursive'
    ctx.fillText('Sensitivity',300,170-40)
    ctx.fillText('Screen Particles',150,275-40)
    ctx.fillText('Advanced Graphics',150,365-40)
    ctx.fillText('Ambient Occlusion',150,455-40)
    ctx.fillText('Lens Flare',450,275-40)
    ctx.fillText('Motion Blur',450,365-40)
    ctx.fillText('Captions',450,455-40)
    
    ctx.strokeStyle='rgb(140,140,140)'
    ctx.lineWidth=10
    ctx.beginPath()
    ctx.moveTo(100,200-40)
    ctx.lineTo(500,200-40)
    ctx.closePath()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(MATH.map(player.sensitivity,0.005-0.0045,0.005+0.0045,100,500),200-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(user.mousePressed&&button_center(user.mouseX,user.mouseY,300,200-40,500,45)){
        player.sensitivity=MATH.map(MATH.constrain(user.mouseX,100,500),100,500,0.005-0.0045,0.005+0.0045)
    }
    
    ctx.beginPath()
    ctx.arc(130,310-40,10,0,MATH.TWO_PI)
    ctx.rect(130,300-40,40,20)
    ctx.arc(170,310-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(player.displayScreenParticles){
        ctx.fillStyle='rgb(0,255,0)'
        ctx.beginPath()
        ctx.arc(170,310-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    } else {ctx.fillStyle='rgb(255,0,0)'
        ctx.beginPath()
        ctx.arc(130,310-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    }
    if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,150,310-40,60,30)){player.displayScreenParticles=!player.displayScreenParticles}
    
    ctx.fillStyle='white'
    ctx.beginPath()
    ctx.arc(130,400-40,10,0,MATH.TWO_PI)
    ctx.rect(130,390-40,40,20)
    ctx.arc(170,400-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(player.useBloom){
        ctx.fillStyle='rgb(0,255,0)'
        ctx.beginPath()
        ctx.arc(170,400-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    } else {ctx.fillStyle='rgb(255,0,0)'
        ctx.beginPath()
        ctx.arc(130,400-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    }
    if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,150,400-40,60,30)){player.useBloom=!player.useBloom;backgroundColor=(player.useBloom?[0.4,0.6,0.8,1]:[0.7,0.9,1,1]);player.useSSAO=false;player.lensFlare=false;}
    
    ctx.fillStyle=player.useBloom?'white':'rgb(100,100,100)'
    ctx.beginPath()
    ctx.arc(130,500-40,10,0,MATH.TWO_PI)
    ctx.rect(130,490-40,40,20)
    ctx.arc(170,500-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(player.useSSAO){
        ctx.fillStyle='rgb(0,255,0)'
        ctx.beginPath()
        ctx.arc(170,500-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    } else {ctx.fillStyle='rgb(255,0,0)'
        ctx.beginPath()
        ctx.arc(130,500-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    }
    
    if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,450,310-40,60,30)&&player.useBloom){player.lensFlare=!player.lensFlare}
    
    ctx.fillStyle=player.useBloom?'white':'rgb(100,100,100)'
    ctx.beginPath()
    ctx.arc(430,310-40,10,0,MATH.TWO_PI)
    ctx.rect(430,300-40,40,20)
    ctx.arc(470,310-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(player.lensFlare){
        ctx.fillStyle='rgb(0,255,0)'
        ctx.beginPath()
        ctx.arc(470,310-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    } else {ctx.fillStyle='rgb(255,0,0)'
        ctx.beginPath()
        ctx.arc(430,310-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    }
    
    ctx.fillStyle='white'
    ctx.beginPath()
    ctx.arc(430,400-40,10,0,MATH.TWO_PI)
    ctx.rect(430,390-40,40,20)
    ctx.arc(470,400-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(player.useMotionBlur){
        ctx.fillStyle='rgb(0,255,0)'
        ctx.beginPath()
        ctx.arc(470,400-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    } else {ctx.fillStyle='rgb(255,0,0)'
        ctx.beginPath()
        ctx.arc(430,400-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    }
    if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,450,400-40,60,30)){player.useMotionBlur=!player.useMotionBlur}
    
    ctx.fillStyle='white'
    ctx.beginPath()
    ctx.arc(430,500-40,10,0,MATH.TWO_PI)
    ctx.rect(430,490-40,40,20)
    ctx.arc(470,500-40,10,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    if(player.captions){
        ctx.fillStyle='rgb(0,255,0)'
        ctx.beginPath()
        ctx.arc(470,500-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    } else {ctx.fillStyle='rgb(255,0,0)'
        ctx.beginPath()
        ctx.arc(430,500-40,8,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
    }
    if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,450,500-40,60,30)){player.captions=!player.captions}
    
    
    ctx.fillStyle=player.useBloom?'rgb(100,100,100)':'rgb(50,50,50)'
    ctx.beginPath()
    ctx.fillRect(150,527-40,300,75)
    ctx.arc(150,527-40+75*0.5,75*0.5,0,MATH.TWO_PI)
    ctx.arc(450,527-40+75*0.5,75*0.5,0,MATH.TWO_PI)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle='white'
    
    if(button_center(user.mouseX,user.mouseY,300,527-40+75*0.5,300,75)){
        
        ctx.fillStyle='rgb(200,200,200)'
        
        if(user.mouseClicked){
            
            currentSuperSecretShader=(currentSuperSecretShader+1)%superSecretShaders.length
            bloomCombineProgram=createProgram(superSecretShaders[currentSuperSecretShader])
            glCache.bloomCombine_ogTex=gl.getUniformLocation(bloomCombineProgram,'ogTex')
            glCache.bloomCombine_bloomTex=gl.getUniformLocation(bloomCombineProgram,'bloomTex')
            glCache.bloomCombine_sunrayTex=gl.getUniformLocation(bloomCombineProgram,'sunrayTex')
            glCache.bloomCombine_infoTex=gl.getUniformLocation(bloomCombineProgram,'infoTex')
            glCache.bloomCombine_ssaoTex=gl.getUniformLocation(bloomCombineProgram,'ssaoTex')
            glCache.bloomCombine_time=gl.getUniformLocation(bloomCombineProgram,'time')
        }
    }
    
    
    ctx.font='bold 25px cursive'
    ctx.fillText('Super Secret Settings',300,525)
    ctx.font='13px cursive'
    ctx.fillText('(Advanced graphics required)',300,540)
    
    if(user.keys.b){
        
        ctx.textAlign='start'
        currentScene='title'
    }
}

let screenParticles=[]

for(let i=0,inc=360/20;i<360;i+=inc){
    
    let x=Math.sin(i*MATH.TO_RAD),y=Math.cos(i*MATH.TO_RAD),r=MATH.random(2,30)
    
    x*=r
    y*=r
    
    screenParticles.push({a:[x,y],b:[x*2,y*2],dir:[x,y],bounds:MATH.random(350,575)})
}




let skyVertBuffer=gl.createBuffer(),skyIndexBuffer=gl.createBuffer(),b=1000000,skyVerts=[-b,b,0,-b,-b,0,b,-b,0,b,b,0],skyIndex=[0,1,2,2,3,0],l=skyVerts.length/3,skySunDir=[200,100,-750]

for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/20){
    
    skyVerts.push(Math.sin(i)*0.05/aspect,Math.cos(i)*0.05,1)
}

for(let i=l;i<skyVerts.length/3-1;i+=1){
    
    skyIndex.push(i+1,i,l)
}

gl.bindBuffer(gl.ARRAY_BUFFER,skyVertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(skyVerts),gl.STATIC_DRAW)

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,skyIndexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(skyIndex),gl.STATIC_DRAW)



scenes.play=function(){
    
    if(MATH.manhattanDist_milk()<5){
        
        if(currentLevel===24||currentLevel===-1){
            
            ctx.textAlign='start'
            initTitleScreen()
            currentScene='title'
            document.exitPointerLock()
            uiCanvas.onmousemove=function(e){
                
                user.mouseX=e.x
                user.mouseY=e.y
            }
            uiCanvas.onmousedown=function(e){
                
                user.mousePressed=true
                user.mouseClicked=true
                user.mouseButton=e.button
            }
            
        } else {
            
            if(player.useMotionBlur){
                
                ctx.globalAlpha=0.4
                ctx.drawImage(gl.canvas,0,0,600,600)
                ctx.globalAlpha=1
                
            } else {
                
                ctx.drawImage(gl.canvas,0,0,600,600)
            }
            
            uiCanvas.onmousemove=function(e){
                
                user.mouseX=e.x
                user.mouseY=e.y
            }
            uiCanvas.onmousedown=function(e){
                
                user.mousePressed=true
                user.mouseClicked=true
                user.mouseButton=e.button
            }
            
            document.exitPointerLock()
            
            ctx.fillStyle=titleScreenVignetteGradient
            ctx.fillRect(0,0,600,600)
            ctx.font='bold 50px cursive'
            ctx.strokeStyle='rgb(255,0,0)'
            ctx.lineWidth=3
            ctx.textAlign='center'
            ctx.fillStyle='white'
            
            if(button_center(user.mouseX,user.mouseY,300,190,150,75)){
                ctx.fillStyle='rgb(150,150,150)'
                
                if(user.clicked_use){
                    
                    currentLevel++
                    setLevel(currentLevel)
                    player.paused=false
                    ctx.fillStyle='rgb(0,0,0)'
                    uiCanvas.requestPointerLock()
                    ctx.strokeStyle='black'
                    ctx.lineWidth=2
                    uiCanvas.onmousemove=function(e){
                        
                        user.mouseX=e.x
                        user.mouseY=e.y
                        
                        player.yaw-=e.movementX*player.sensitivity
                        player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
                    }
                    
                    uiCanvas.onmousedown=function(e){
                    
                        user.mousePressed=true
                        user.mouseClicked=true
                        uiCanvas.requestPointerLock()
                        user.mouseButton=e.button
                    }
                }
            }
            coolText('Next',300,200)
            
            ctx.fillStyle='white'
            
            if(button_center(user.mouseX,user.mouseY,300,290,150,75)){
                ctx.fillStyle='rgb(150,150,150)'
                
                if(user.clicked_use){
                    
                    setLevel(currentLevel)
                    player.paused=false
                    currentScene='play'
                    uiCanvas.requestPointerLock()
                    ctx.strokeStyle='black'
                    ctx.lineWidth=2
                    uiCanvas.onmousemove=function(e){
                        
                        user.mouseX=e.x
                        user.mouseY=e.y
                        
                        player.yaw-=e.movementX*player.sensitivity
                        player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
                    }
                    
                    uiCanvas.onmousedown=function(e){
                    
                        user.mousePressed=true
                        user.mouseClicked=true
                        uiCanvas.requestPointerLock()
                        user.mouseButton=e.button
                    }
                }
            }
            coolText('Retry',300,300)
            
            ctx.fillStyle='white'
            
            if(button_center(user.mouseX,user.mouseY,300,390,150,75)){
                ctx.fillStyle='rgb(150,150,150)'
                
                if(user.clicked_use){
                    
                    player.paused=false
                    ctx.textAlign='start'
                    initTitleScreen()
                    currentScene='title'
                    document.exitPointerLock()
                    uiCanvas.onmousemove=function(e){
                        
                        user.mouseX=e.x
                        user.mouseY=e.y
                    }
                    uiCanvas.onmousedown=function(e){
                        
                        user.mousePressed=true
                        user.mouseClicked=true
                        user.mouseButton=e.button
                    }
                    player.dead=false
                    player.currentWeapon='hand'
                }
            }
            
            ctx.font='bold 45px cursive'
            coolText('Main Menu',300,400)
            ctx.font='27px cursive'
            ctx.fillStyle='white'
            
            ctx.fillText(~~(0.00166666667*player.levelTime)+' : '+~~(0.1*player.levelTime)%60+' : '+~~(10*player.levelTime)%100,300,50)
            ctx.font='20px cursive'
        }
        
        return
    }
    
    if(player.paused){
        
        if(player.useMotionBlur){
        
            ctx.globalAlpha=0.4
            ctx.drawImage(gl.canvas,0,0,600,600)
            ctx.globalAlpha=1
            
        } else {
            
            ctx.drawImage(gl.canvas,0,0,600,600)
        }
        
        uiCanvas.onmousemove=function(e){
            
            user.mouseX=e.x
            user.mouseY=e.y
        }
        uiCanvas.onmousedown=function(e){
            
            user.mousePressed=true
            user.mouseClicked=true
            user.mouseButton=e.button
        }
        
        document.exitPointerLock()
        
        ctx.fillStyle=titleScreenVignetteGradient
        ctx.fillRect(0,0,600,600)
        ctx.font='bold 50px cursive'
        ctx.strokeStyle='rgb(255,0,0)'
        ctx.lineWidth=3
        ctx.textAlign='center'
        ctx.fillStyle='white'
        
        if(button_center(user.mouseX,user.mouseY,300,190,150,75)){
            ctx.fillStyle='rgb(150,150,150)'
            
            if(user.clicked_use){
                
                player.paused=false
                ctx.fillStyle='rgb(0,0,0)'
                uiCanvas.requestPointerLock()
                ctx.strokeStyle='black'
                ctx.lineWidth=2
                uiCanvas.onmousemove=function(e){
                    
                    user.mouseX=e.x
                    user.mouseY=e.y
                    
                    player.yaw-=e.movementX*player.sensitivity
                    player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
                }
                
                uiCanvas.onmousedown=function(e){
                
                    user.mousePressed=true
                    user.mouseClicked=true
                    uiCanvas.requestPointerLock()
                    user.mouseButton=e.button
                }
            }
        }
        coolText('Resume',300,200)
        
        ctx.fillStyle='white'
        
        if(button_center(user.mouseX,user.mouseY,300,290,150,75)){
            ctx.fillStyle='rgb(150,150,150)'
            
            if(user.clicked_use){
                
                setLevel(currentLevel)
                player.paused=false
                currentScene='play'
                uiCanvas.requestPointerLock()
                ctx.strokeStyle='black'
                ctx.lineWidth=2
                uiCanvas.onmousemove=function(e){
                    
                    user.mouseX=e.x
                    user.mouseY=e.y
                    
                    player.yaw-=e.movementX*player.sensitivity
                    player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-1.57,1.57)
                }
                
                uiCanvas.onmousedown=function(e){
                
                    user.mousePressed=true
                    user.mouseClicked=true
                    uiCanvas.requestPointerLock()
                    user.mouseButton=e.button
                }
            }
        }
        coolText('Retry',300,300)
        
        ctx.fillStyle='white'
        
        if(button_center(user.mouseX,user.mouseY,300,390,150,75)){
            ctx.fillStyle='rgb(150,150,150)'
            
            if(user.clicked_use){
                
                player.paused=false
                ctx.textAlign='start'
                initTitleScreen()
                currentScene='title'
                document.exitPointerLock()
                uiCanvas.onmousemove=function(e){
                    
                    user.mouseX=e.x
                    user.mouseY=e.y
                }
                uiCanvas.onmousedown=function(e){
                    
                    user.mousePressed=true
                    user.mouseClicked=true
                    user.mouseButton=e.button
                }
                player.dead=false
                player.currentWeapon='hand'
            }
        }
        
        ctx.font='bold 45px cursive'
        coolText('Main Menu',300,400)
        ctx.font='20px cursive'
        
        return
    }
    
    player.timeTimer-=dt
    
    if(user.keys.k||user.mousePressed&&user.mouseButton===2){
        
        player.timeTimer=1
    }
    
    player.timeMultiplier=MATH.lerp(1,0.35,MATH.constrain(player.timeTimer,0,1))
        
    if(player.useBloom){
        
        gl.bindFramebuffer(gl.FRAMEBUFFER,og_fb)
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    
    
    gl.clearColor(backgroundColor[0],backgroundColor[1],backgroundColor[2],1)
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    
    gl.useProgram(staticGeometryProgram)
    player.updatePhysics(dt)
    physicsWorld.step(dt*0.33)
    
    
    player.updateCamera()
    
    weapons[player.currentWeapon].update(player.crouching?dt*1.25:dt)
    
    gl.useProgram(skyRendererProgram)
    
    let _v=[player.body.position.x+skySunDir[0],player.body.position.y+skySunDir[1],player.body.position.z+skySunDir[2],1]
    
    vec4.transformMat4(_v,_v,player.viewMatrix)
    vec4.scale(_v,_v,1/_v[3])
    
    let xPos=_v[0],yPos=_v[1],showSky=player.lookDir[0]*skySunDir[0]+player.lookDir[1]*skySunDir[1]+player.lookDir[2]*skySunDir[2]>0.5,useFlare=true
    
    gl.uniform2f(glCache.sky_translation,xPos,yPos)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,skyVertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,skyIndexBuffer)
    gl.vertexAttribPointer(glCache.sky_vertPos,2,gl.FLOAT,gl.FALSE,12,0)
    gl.vertexAttribPointer(glCache.sky_vertIsSun,1,gl.FLOAT,gl.FALSE,12,8)
    gl.drawElements(gl.TRIANGLES,skyIndex.length,gl.UNSIGNED_SHORT,0)
    
    xPos+=1
    xPos*=300
    yPos+=1
    yPos*=300
    yPos=600-yPos
    
    gl.useProgram(dynamicGeometryProgram)
    
    gl.uniformMatrix4fv(glCache.dynamic_viewMatrix,gl.FALSE,player.viewMatrix)
    
    gl.uniform3f(glCache.dynamic_playerPos,player.body.position.x,player.body.position.y+player.height,player.body.position.z)
    
    let f=TIME*0.1,c=Math.cos(f),s=Math.sin(f),axis=[c,c*s,s]
    
    mat4.fromRotation(MILK_MATRIX,f,axis)
    MILK_MATRIX[12]=levels[currentLevel].milk[0]
    MILK_MATRIX[13]=levels[currentLevel].milk[1]
    MILK_MATRIX[14]=levels[currentLevel].milk[2]
    
    gl.bindVertexArray(meshes.milk.VAO)
    gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,MILK_MATRIX)
    gl.drawElements(gl.TRIANGLES,meshes.milk.indexAmount,gl.UNSIGNED_SHORT,0)
    
    for(let i=physicsObjects.objects.length;i--;){
        
        gl.bindVertexArray(physicsObjects.objects[i].mesh.VAO)
        
        if(physicsObjects.objects[i].update(dt)){
            
            physicsObjects.objects[i].die(i)
        }
    }
    
    gl.bindVertexArray(null)
    
    gl.useProgram(weaponRendererProgram)
    
    gl.uniformMatrix4fv(glCache.weapon_viewMatrix,gl.FALSE,player.viewMatrix)
    
    gl.uniform3f(glCache.weapon_playerPos,player.body.position.x,player.body.position.y+player.height,player.body.position.z)
    
    if(weapons[player.currentWeapon].render!==false){
        
        WeaponRenderingQ.add(player.currentWeapon,player.weaponMatrix,weapons[player.currentWeapon].renderOffset||meshes[player.currentWeapon].offset,player.weaponReload)
    }
    
    WeaponRenderingQ.render()
    
    gl.useProgram(particleRendererProgram)
    
    gl.uniformMatrix4fv(glCache.particle_viewMatrix,gl.FALSE,player.viewMatrix)
    
    for(let i in levels[currentLevel].updatedParticleSystems){
        
        levels[currentLevel].updatedParticleSystems[i].update()
    }
    
    ParticleRenderer.render(dt)
    
    gl.useProgram(staticGeometryProgram)
    
    gl.uniform3f(glCache.static_playerPos,player.body.position.x,player.body.position.y+player.height,player.body.position.z)
    
    levelMesh.render()
    
    gl.uniform1f(glCache.static_alpha,0.75)
    
    for(let i=levels[currentLevel].updatedBodies.length;i--;){
        
        if(levels[currentLevel].updatedBodies[i].update()){
            
            levels[currentLevel].updatedBodies[i].die(i,currentLevel)
        }
    }
    
    gl.uniform1f(glCache.static_alpha,1)
    
    levels[currentLevel].addLines(LineRenderer)
    LineRenderer.render()
    
    
    if(levelBoard.draw){
        
        gl.useProgram(boardGeometryProgram)
        gl.bindTexture(gl.TEXTURE_2D,textures.messages)
        gl.uniformMatrix4fv(glCache.board_viewMatrix,gl.FALSE,player.viewMatrix)
        
        gl.bindBuffer(gl.ARRAY_BUFFER,levelBoard.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,levelBoard.indexBuffer)
        gl.vertexAttribPointer(glCache.board_vertPos,3,gl.FLOAT,gl.FALSE,20,0)
    gl.vertexAttribPointer(glCache.board_vertTexCoord,2,gl.FLOAT,gl.FALSE,20,12)
        
        gl.drawElements(gl.TRIANGLES,levelBoard.indexAmount,gl.UNSIGNED_SHORT,0)
        
    }
    
    if(player.useBloom){
        
        if(player.lensFlare&&showSky){
            
            gl.readPixels(xPos,600-yPos,1,1,gl.RGBA,gl.UNSIGNED_BYTE,player.sunFlareSample)
            
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,screenVertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,screenIndexBuffer)
        gl.vertexAttribPointer(glCache.postprocessingScreenVerts,2,gl.FLOAT,gl.FALSE,8,0)
        
        if(showSky){
            
            gl.useProgram(sunRayProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,sunray_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
            gl.uniform2f(glCache.sunray_sunPos,_v[0],_v[1])
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        if(player.useSSAO||currentSuperSecretShader===1){
            
            gl.useProgram(ssaoProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,ssao_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_normal)
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        gl.useProgram(bloomFilterProgram)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.bindFramebuffer(gl.FRAMEBUFFER,filtered_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurHorProgram)
        gl.bindTexture(gl.TEXTURE_2D,filtered_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_hor_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurVerProgram)
        gl.bindTexture(gl.TEXTURE_2D,blurred_hor_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_ver_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomCombineProgram)
        gl.bindFramebuffer(gl.FRAMEBUFFER,fxaa_fb)
        gl.activeTexture(gl.TEXTURE4)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.activeTexture(gl.TEXTURE3)
        gl.bindTexture(gl.TEXTURE_2D,blurred_ver_tex)
        gl.activeTexture(gl.TEXTURE2)
        gl.bindTexture(gl.TEXTURE_2D,sunray_tex)
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,ssao_tex)
        gl.uniform1i(glCache.bloomCombine_ogTex,4)
        gl.uniform1i(glCache.bloomCombine_bloomTex,3)
        gl.uniform1i(glCache.bloomCombine_sunrayTex,2)
        gl.uniform1i(glCache.bloomCombine_infoTex,1)
        gl.uniform1i(glCache.bloomCombine_ssaoTex,0)
        gl.uniform1f(glCache.bloomCombine_time,frameCount)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(fxaaProgram)
        gl.bindTexture(gl.TEXTURE_2D,fxaa_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,null)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
    }
    
    
    if(player.useMotionBlur){
        
        ctx.globalAlpha=0.4
        ctx.drawImage(gl.canvas,0,0,600,600)
        ctx.globalAlpha=1
        
    } else {
        
        ctx.drawImage(gl.canvas,0,0,600,600)
    }
    
    if(player.lensFlare&&showSky&&player.sunFlareSample[0]===102&&player.sunFlareSample[1]===153&&player.sunFlareSample[2]===204&&player.useBloom){
        
        let flareX=xPos,flareY=yPos,dirX=300-xPos,dirY=300-yPos
        
        flareX+=dirX*0.45
        flareY+=dirY*0.45
        
        ctx.globalCompositeDirection='lighter'
        ctx.lineWidth=3
        
        ctx.filter='blur(10px)'
        ctx.beginPath()
        ctx.fillStyle='rgb(255,0,0,0.1)'
        ctx.arc(flareX,flareY,50,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
        
        ctx.filter='blur(10px)'
        ctx.beginPath()
        ctx.strokeStyle='rgb(0,255,0)'
        ctx.arc(flareX,flareY,150,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.stroke()
        
        flareX+=dirX*0.2
        flareY+=dirY*0.2
        
        ctx.filter='blur(6px)'
        ctx.beginPath()
        ctx.strokeStyle='rgb(255,255,0)'
        ctx.arc(flareX,flareY,120,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.stroke()
        
        flareX+=dirX*0.2
        flareY+=dirY*0.2
        
        ctx.filter='blur(9px)'
        ctx.beginPath()
        ctx.strokeStyle='rgb(0,200,255)'
        ctx.arc(flareX,flareY,90,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.stroke()
        
        flareX+=dirX*0.35
        flareY+=dirY*0.35
        
        ctx.filter='blur(10px)'
        ctx.beginPath()
        ctx.fillStyle='rgb(255,0,255,0.1)'
        ctx.arc(flareX,flareY,50,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
        
        ctx.fillStyle='rgb(0,255,0)'
        ctx.filter='none'
        ctx.lineWidth=2
        ctx.globalCompositeDirection='source-over'
    }
    
    if(player.dead){
        
        player.body.velocity.setZero()
        player.isHolding=false
        player.currentWeapon='hand'
        document.exitPointerLock()
        
        ctx.fillStyle=titleScreenVignetteGradient
        ctx.fillRect(0,0,600,600)
        ctx.font='bold 50px cursive'
        ctx.strokeStyle='rgb(255,0,0)'
        ctx.lineWidth=3
        ctx.textAlign='center'
        ctx.fillStyle='white'
        
        if(button_center(user.mouseX,user.mouseY,300,240,150,75)){
            ctx.fillStyle='rgb(150,150,150)'
            
            if(user.clicked_use){
                
                setLevel(currentLevel)
                player.dead=false
                currentScene='play'
                uiCanvas.requestPointerLock()
                ctx.strokeStyle='black'
                ctx.lineWidth=2
            }
        }
        coolText('Retry',300,250)
        
        ctx.fillStyle='white'
        
        if(button_center(user.mouseX,user.mouseY,300,340,150,75)){
            ctx.fillStyle='rgb(150,150,150)'
            
            if(user.clicked_use){
                
                ctx.textAlign='start'
                initTitleScreen()
                currentScene='title'
                document.exitPointerLock()
                uiCanvas.onmousemove=function(e){
                    
                    user.mouseX=e.x
                    user.mouseY=e.y
                }
                uiCanvas.onmousedown=function(e){
                    
                    user.mousePressed=true
                    user.mouseClicked=true
                    user.mouseButton=e.button
                }
                player.dead=false
                player.currentWeapon='hand'
            }
        }
        
        ctx.font='bold 45px cursive'
        coolText('Main Menu',300,350)
        ctx.font='20px cursive'
        
        return
    }
    
    if(player.scoping){
        
        player.body.velocity.x*=0.85
        player.body.velocity.z*=0.85
        
        ctx.fillStyle=scopingGradient
        ctx.fillRect(0,0,600,600)
        
        ctx.strokeStyle='rgb(0,0,0)'
        ctx.lineWidth=4
        
        ctx.beginPath()
        ctx.moveTo(0,300)
        ctx.lineTo(600,300)
        ctx.moveTo(300,0)
        ctx.lineTo(300,600)
        ctx.stroke()
        
        ctx.strokeStyle='black'
        ctx.lineWidth=2
        ctx.fillStyle='rgb(0,255,0)'
        
    } else {
        
        ctx.strokeStyle='black'
        ctx.beginPath()
        ctx.moveTo(290,300)
        ctx.lineTo(297,300)
        ctx.moveTo(300,290)
        ctx.lineTo(300,297)
        ctx.moveTo(310,300)
        ctx.lineTo(303,300)
        ctx.moveTo(300,310)
        ctx.lineTo(300,303)
        ctx.stroke()
    }
    
    if(player.displayScreenParticles){
        //yikes a square root
        let speed=player.body.velocity.length()*0.7*dt,
            speed_1_5=speed*1.5
        
        if(speed>5*0.11){
            
            player.addSound('Wind blows',false,50,10)
            
            if(frameCount%120===0 && Math.random()<0.2){
                
                player.timeTimer=5
            }
        }
        
        for(let i in screenParticles){
            
            let p=screenParticles[i]
            p.a[0]+=p.dir[0]*speed
            p.a[1]+=p.dir[1]*speed
            p.b[0]+=p.dir[0]*speed_1_5
            p.b[1]+=p.dir[1]*speed_1_5
            
            let d=Math.abs(p.a[0])+Math.abs(p.a[1]),
                alp=Math.min(speed*Math.max(d-150,0),200)*MATH.RECIP_255
            
            ctx.strokeStyle='rgba(255,255,255,'+alp+')'
            ctx.beginPath()
            ctx.moveTo(p.a[0]+300,p.a[1]+300)
            ctx.lineTo(p.b[0]+300,p.b[1]+300)
            ctx.closePath()
            ctx.stroke()
            
            if(p.a[0]<-p.bounds || p.a[0]>p.bounds || p.a[1]<-p.bounds || p.a[1]>p.bounds){
                p.a=p.dir.slice()
                p.b=p.dir.slice()
                p.b[0]*=2
                p.b[1]*=2
            }
        }
    }
    
    if(player.captions && player.sound){
        
        ctx.shadowColor='rgb(0,0,0,0.6)'
        ctx.fillStyle='rgb(255,255,255,'+player.soundTimer*0.2+')'
        let left='',right=''
        
        if(player.soundPos){
            
            let dx=player.soundPos[0]-player.body.position.x,
                dz=player.soundPos[2]-player.body.position.z
            
            let dot=dx*player.lookDir[2]+dz*-player.lookDir[0]
            
            if(dot>0){
                
                left='<<'
                
            } else {
                
                right='>>'
            }
        }
        
        ctx.fillText(left+' *'+player.sound+'* '+right,300,550)
        ctx.shadowColor='rgb(0,0,0,0)'
        
        player.soundTimer-=dt
        
        if(player.soundTimer<=0){
            
            player.sound=false
        }
    }
    
    ctx.fillStyle='rgb(255,255,255)'
    ctx.fillText(~~(0.00166666667*player.levelTime)+' : '+~~(0.1*player.levelTime)%60+' : '+~~(10*player.levelTime)%100,300,50)
    
    if(player.timeMultiplier!==1){
        
        ctx.globalAlpha=Math.min(player.timeTimer,0.8)
        ctx.fillStyle=titleScreenVignetteGradient
        ctx.fillRect(0,0,600,600)
        ctx.globalAlpha=1
    }
}

let levelMade={
    
    data:[
        
        {pos:[0,-4,0],size:[75,2,75],rot:[0,0,0],col:[0.1,0.5,1]}
    ],
    lightPos:[0,8,0],
    spawnPos:[0,0,20],
    milk:[0,0,5],
    selectGlow:0,
    mesh:new Mesh(),
    extraMesh:new Mesh(),
    selectedPart:null,
    pageOfParticleSystemData:0,
}

let selectMesh=new Mesh()

function loadLevelFromData(levelMade,lightPos,spawnPos,milk,billyPos){
    
    let wallData=[],initData=[],glassData=[],lavaData=[],particleData=[],lineFuncStr=''
    
    for(let i in levelMade){
        
        let p=levelMade[i]
        
        if(!p.partInfo){
            
            switch(p.special){
                
                case undefined:
                    
                    wallData.push(p)
                    
                break
                
                case 'glass':
                    
                    glassData.push(p)
                    
                break
                
                case 'lava':
                    
                    lavaData.push(p)
                    
                break
                
                case 'particleSystem':
                    
                    particleData.push(p)
                    
                break
                
                case 'line':
                    
                    lineFuncStr=lineFuncStr+'LineRenderer.add(['+p.lineData.p1[0]+','+p.lineData.p1[1]+','+p.lineData.p1[2]+'],['+p.lineData.p2[0]+','+p.lineData.p2[1]+','+p.lineData.p2[2]+'],'+p.lineData.thickness1+','+p.lineData.thickness2+',['+p.lineData.col1[0]+','+p.lineData.col1[1]+','+p.lineData.col1[2]+','+p.lineData.col1[3]+'],['+p.lineData.col2[0]+','+p.lineData.col2[1]+','+p.lineData.col2[2]+','+p.lineData.col2[3]+'],'+p.lineData.widthScale+','+p.lineData.heightScale+','+p.detail+');'
                    
                break
            }
            
        } else {
            
            let classes={weapon:PhysicsWeapon,box:PhysicsBox,sphere:PhysicsSphere,enemy:PhysicsEnemy,barrel:PhysicsBarrel},instance_of=classes[p.partInfo.instance]
            
            initData.push(instance_of,p.partInfo)
        }
    }
    
    return {
        
        data:wallData,
        glass:glassData,
        lava:lavaData,
        init:initData,
        lightPos:lightPos,
        spawnPos:spawnPos,
        milk:milk,
        billyPos:billyPos,
        particleSystems:particleData,
        addLines:Object.constructor('LineRenderer',lineFuncStr)
    }
}

function printArr(a){
    
    let s=''
    
    for(let i in a){
        
        s+=a[i]+','
    }
    
    return '['+s.substr(0,s.length-1)+']'
}

function printLevelString(arr,lightPos,spawnPos,milkPos){
    
    let str=JSON.stringify(arr)
    
    str=str.replaceAll('"',"'")
    return str+'#'+printArr(lightPos)+'#'+printArr(spawnPos)+'#'+printArr(milkPos)
    
}

scenes.levelCreator=function(){
    
    if(user.keys.t){
        
        ctx.textAlign='start'
        currentScene='title'
        initTitleScreen()
        return
    }
    
    if(user.keys.i){
        
        loadLevelDataButton.addEventListener('click',function(){
            
            enterLevelDataPage.style.display='none'
            
            let _input=levelDataInput.value.split('#')
            
            //retrieve level geometry & objects
            let func=Object.constructor('return '+_input[0]+';'),
                _levelData=func()
            
            //retrieve light position
            func=Object.constructor('return'+_input[1])
            let _lightPos=func()
            
            //retrieve spawn position
            func=Object.constructor('return'+_input[2])
            let _spawnPos=func()
            
            //retrieve milk position
            func=Object.constructor('return'+_input[3])
            let _milkPos=func()
            
            func=Object.constructor('return '+_input[4])
            let _billyPos=func()
            
            levelMade.data=_levelData
            levelMade.lightPos=_lightPos
            levelMade.spawnPos=_spawnPos
            levelMade.milk=_milkPos
            levelMade.billyPos=_billyPos
            
            currentScene='levelCreator'
        })
        
        enterLevelDataPage.style.display='block'
        currentScene='enterLevelData_creator'
        levelMade.selectedPart=null
        return
    }
    
    if(player.useBloom){
        
        gl.bindFramebuffer(gl.FRAMEBUFFER,og_fb)
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.boxTexture)
    
    gl.clearColor(backgroundColor[0],backgroundColor[1],backgroundColor[2],1)
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    
    
    gl.useProgram(staticGeometryProgram)
    gl.uniform3f(glCache.static_lightPos,...levelMade.lightPos)
    
    player.updatePhysicsFree(dt)
    player.updateCameraMatrices()
    
    gl.uniform3f(glCache.static_playerPos,player.body.position.x,player.body.position.y+player.height,player.body.position.z)
    
    levelMade.mesh.makeMesh(levelMade.data,false)
    
    levelMade.mesh.setBuffers()
    levelMade.mesh.render()
    
    levelMade.extraMesh.makeMesh([{pos:levelMade.lightPos,size:[0.5,0.5,0.5],rot:[0,0,0],col:[100,100,0],useTex:false},{pos:levelMade.spawnPos,size:[0.5,0.5,0.5],rot:[0,0,0],col:[100,0,0],useTex:false},{pos:levelMade.milk,size:[0.5,0.5,0.5],rot:[0,0,0],col:[0,0,100],useTex:false}],false)
    levelMade.extraMesh.setBuffers()
    levelMade.extraMesh.render()
    
    if(levelMade.selectedPart!==null && typeof levelMade.selectedPart==='number'){
        
        let p=levelMade.data[levelMade.selectedPart],temp=p.render
        
        p.col[0]+=levelMade.selectGlow
        p.col[1]+=levelMade.selectGlow
        p.col[2]+=levelMade.selectGlow
        
        if(p.special!=='line'){p.render=true}
        
        selectMesh.makeMesh([p],false)
        selectMesh.setBuffers()
        selectMesh.render()
        
        p.render=temp
        p.col[0]-=levelMade.selectGlow
        p.col[1]-=levelMade.selectGlow
        p.col[2]-=levelMade.selectGlow
    }
    
    for(let i in levelMade.data){
        
        if(levelMade.data[i].special!=='line'){continue;}
        
        let p=levelMade.data[i].lineData
        
        LineRenderer.add(p.p1,p.p2,p.thickness1,p.thickness2,p.col1,p.col2,p.widthScale,p.heightScale,p.detail)
    }
    
    if(levelMade.selectedPart!==null && typeof levelMade.selectedPart==='number' && levelMade.data[levelMade.selectedPart].special==='line'){
        
        let p=levelMade.data[levelMade.selectedPart].lineData
        
        LineRenderer.add(p.p1,p.p2,p.thickness1,p.thickness2,[p.col1[0]+levelMade.selectGlow,p.col1[1]+levelMade.selectGlow,p.col1[2]+levelMade.selectGlow,p.col1[3]],[p.col2[0]+levelMade.selectGlow,p.col2[1]+levelMade.selectGlow,p.col2[2]+levelMade.selectGlow,p.col2[3]],p.widthScale,p.heightScale,p.detail)
        
    }
    
    LineRenderer.render()
    
    gl.useProgram(skyRendererProgram)
    
    let _v=[player.body.position.x+skySunDir[0],player.body.position.y+skySunDir[1],player.body.position.z+skySunDir[2],1]
    
    vec4.transformMat4(_v,_v,player.viewMatrix)
    vec4.scale(_v,_v,1/_v[3])
    
    let xPos=_v[0],yPos=_v[1],showSky=player.lookDir[0]*skySunDir[0]+player.lookDir[1]*skySunDir[1]+player.lookDir[2]*skySunDir[2]>0.5,useFlare=true
    
    
    gl.uniform2f(glCache.sky_translation,xPos,yPos)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,skyVertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,skyIndexBuffer)
    gl.vertexAttribPointer(glCache.sky_vertPos,2,gl.FLOAT,gl.FALSE,12,0)
    gl.vertexAttribPointer(glCache.sky_vertIsSun,1,gl.FLOAT,gl.FALSE,12,8)
    gl.drawElements(gl.TRIANGLES,skyIndex.length,gl.UNSIGNED_SHORT,0)
    
    xPos+=1
    xPos*=half_width
    yPos+=1
    yPos*=half_height
    yPos=height-yPos
    
    gl.useProgram(particleRendererProgram)
    
    gl.uniformMatrix4fv(glCache.particle_viewMatrix,gl.FALSE,player.viewMatrix)
    
    for(let i in levelMade.data){
        
        if(levelMade.data[i].special==='particleSystem'){
            
            levelMade.data[i].render=false
            
            if(frameCount%levelMade.data[i].particleSystemData.productionRate===0){
                
                let p=levelMade.data[i].particleSystemData
                
                for(let i=0;i<p.batchAmount;i++){
                    
                    ParticleRenderer.add({x:MATH.random(p.pos[0]-p.size[0]*0.5,p.pos[0]+p.size[0]*0.5),y:MATH.random(p.pos[1]-p.size[1]*0.5,p.pos[1]+p.size[1]*0.5),z:MATH.random(p.pos[2]-p.size[2]*0.5,p.pos[2]+p.size[2]*0.5),vx:MATH.random(p.minVelX,p.maxVelX),vy:MATH.random(p.minVelY,p.maxVelY),vz:MATH.random(p.minVelZ,p.maxVelZ),grav:p.grav,size:MATH.random(p.minSize,p.maxSize),col:[MATH.random(p.minR,p.maxR),MATH.random(p.minG,p.maxG),MATH.random(p.minB,p.maxB)],life:MATH.random(p.minLife,p.maxLife)})
                }
            }
        }
    }
    
    ParticleRenderer.render(dt)
    
    if(player.useBloom){
        
        if(player.lensFlare&&showSky){
            
            gl.readPixels(xPos,600-yPos,1,1,gl.RGBA,gl.UNSIGNED_BYTE,player.sunFlareSample)
            
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,screenVertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,screenIndexBuffer)
        gl.vertexAttribPointer(glCache.postprocessingScreenVerts,2,gl.FLOAT,gl.FALSE,8,0)
        
        if(player.lookDir[0]*skySunDir[0]+player.lookDir[1]*skySunDir[1]+player.lookDir[2]*skySunDir[2]>0){
        
            gl.useProgram(sunRayProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,sunray_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
            gl.uniform2f(glCache.sunray_sunPos,_v[0],_v[1])
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        if(player.useSSAO||currentSuperSecretShader===1){
                
            gl.useProgram(ssaoProgram)
            gl.bindFramebuffer(gl.FRAMEBUFFER,ssao_fb)
            gl.bindTexture(gl.TEXTURE_2D,og_tex_normal)
            gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        }
        
        gl.useProgram(bloomFilterProgram)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.bindFramebuffer(gl.FRAMEBUFFER,filtered_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurHorProgram)
        gl.bindTexture(gl.TEXTURE_2D,filtered_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_hor_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomBlurVerProgram)
        gl.bindTexture(gl.TEXTURE_2D,blurred_hor_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,blurred_ver_fb)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(bloomCombineProgram)
        gl.bindFramebuffer(gl.FRAMEBUFFER,fxaa_fb)
        gl.activeTexture(gl.TEXTURE4)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_color)
        gl.activeTexture(gl.TEXTURE3)
        gl.bindTexture(gl.TEXTURE_2D,blurred_ver_tex)
        gl.activeTexture(gl.TEXTURE2)
        gl.bindTexture(gl.TEXTURE_2D,sunray_tex)
        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D,og_tex_info)
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D,ssao_tex)
        gl.uniform1i(glCache.bloomCombine_ogTex,4)
        gl.uniform1i(glCache.bloomCombine_bloomTex,3)
        gl.uniform1i(glCache.bloomCombine_sunrayTex,2)
        gl.uniform1i(glCache.bloomCombine_infoTex,1)
        gl.uniform1i(glCache.bloomCombine_ssaoTex,0)
        gl.uniform1f(glCache.bloomCombine_time,frameCount)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
        
        gl.useProgram(fxaaProgram)
        gl.bindTexture(gl.TEXTURE_2D,fxaa_tex)
        gl.bindFramebuffer(gl.FRAMEBUFFER,null)
        gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)
    }
    
    gl.useProgram(staticGeometryProgram)
    
    if(player.useMotionBlur){
        
        ctx.globalAlpha=0.4
        ctx.drawImage(gl.canvas,0,0,600,600)
        ctx.globalAlpha=1
        
    } else {
        
        ctx.drawImage(gl.canvas,0,0,600,600)
    }
    
    if(player.lensFlare&&showSky&&player.sunFlareSample[0]===102&&player.sunFlareSample[1]===153&&player.sunFlareSample[2]===204&&player.useBloom){
        
        let flareX=xPos,flareY=yPos,dirX=300-xPos,dirY=300-yPos
        
        flareX+=dirX*0.45
        flareY+=dirY*0.45
        
        ctx.globalCompositeDirection='lighter'
        ctx.lineWidth=3
        
        ctx.filter='blur(10px)'
        ctx.beginPath()
        ctx.fillStyle='rgb(255,0,0,0.1)'
        ctx.arc(flareX,flareY,50,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
        
        ctx.filter='blur(10px)'
        ctx.beginPath()
        ctx.strokeStyle='rgb(0,255,0)'
        ctx.arc(flareX,flareY,150,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.stroke()
        
        flareX+=dirX*0.2
        flareY+=dirY*0.2
        
        ctx.filter='blur(6px)'
        ctx.beginPath()
        ctx.strokeStyle='rgb(255,255,0)'
        ctx.arc(flareX,flareY,120,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.stroke()
        
        flareX+=dirX*0.2
        flareY+=dirY*0.2
        
        ctx.filter='blur(9px)'
        ctx.beginPath()
        ctx.strokeStyle='rgb(0,200,255)'
        ctx.arc(flareX,flareY,90,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.stroke()
        
        flareX+=dirX*0.35
        flareY+=dirY*0.35
        
        ctx.filter='blur(10px)'
        ctx.beginPath()
        ctx.fillStyle='rgb(255,0,255,0.1)'
        ctx.arc(flareX,flareY,50,0,MATH.TWO_PI)
        ctx.closePath()
        ctx.fill()
        
        ctx.filter='none'
        ctx.lineWidth=2
        ctx.globalCompositeDirection='source-over'
    }
    
    ctx.fillStyle='rgb(150,150,150)'
    ctx.fillRect(0,0,75,40)
    ctx.fillStyle='white'
    ctx.font='20px cursive'
    ctx.fillText('Save',35,25)
    if(user.mouseClicked && button(user.mouseX,user.mouseY,0,0,75,40)){
        printDataString4Scene()
        currentScene='levelMadeString'
        return
    }
    
    ctx.fillStyle=levelCreatorGradient
    ctx.fillRect(0,0,600,600)
    
    ctx.fillStyle='black'
    ctx.fillRect(298,298,4,4)
    
    ctx.font='30px cursive'
    ctx.fillStyle='rgb(255,255,255)'
    
    ctx.textAlign='center'
    
    if(levelMade.selectedPart!==null&&typeof levelMade.selectedPart==='number'){
        
        let part=levelMade.data[levelMade.selectedPart]
        ctx.fillText('Done',525,580)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,580,120,50)){levelMade.selectedPart=null;return}
        
        ctx.font='20px cursive'
        ctx.fillStyle='black'
        ctx.fillText('Delete',40,590)
        if(user.mouseClicked && button(user.mouseX,user.mouseY,0,580,75,20)){levelMade.data.splice(levelMade.selectedPart,1);levelMade.selectedPart=null;return}
        
        ctx.fillStyle='rgb(255,255,255)'
        ctx.font='25px cursive'
        
        switch((part.partInfo?part.partInfo:{}).instance){
            
            case undefined:
                
                switch(part.special){
                    
                    case undefined:
                        
                        ctx.fillText('Position',525,30)
                        ctx.fillText('Rotation',525,140)
                        ctx.fillText('Scale',525,250)
                        ctx.fillText('Color',525,360)
                        ctx.font='15px cursive'
                        
                        ctx.fillText('Use Texture',510,455)
                        
                        ctx.textAlign='start'
                        
                        ctx.fillText('X: '+part.pos[0].toFixed(2),485,55)
                        ctx.fillText('Y: '+part.pos[1].toFixed(2),485,75)
                        ctx.fillText('Z: '+part.pos[2].toFixed(2),485,95)
                        if(button_center(user.mouseX,user.mouseY,525,55,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,75,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,95,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                        
                        ctx.fillText('X: '+part.rot[0].toFixed(1),485,165)
                        ctx.fillText('Y: '+part.rot[1].toFixed(1),485,185)
                        ctx.fillText('Z: '+part.rot[2].toFixed(1),485,205)
                        if(button_center(user.mouseX,user.mouseY,525,165,150,20)){levelMade.data[levelMade.selectedPart].rot[0]=numberSlider(part.rot[0],0,360,1)}
                        if(button_center(user.mouseX,user.mouseY,525,185,150,20)){levelMade.data[levelMade.selectedPart].rot[1]=numberSlider(part.rot[1],0,360,1)}
                        if(button_center(user.mouseX,user.mouseY,525,205,150,20)){levelMade.data[levelMade.selectedPart].rot[2]=numberSlider(part.rot[2],0,360,1)}
                        
                        ctx.fillText('X: '+part.size[0].toFixed(2),485,275)
                        ctx.fillText('Y: '+part.size[1].toFixed(2),485,295)
                        ctx.fillText('Z: '+part.size[2].toFixed(2),485,315)
                        if(button_center(user.mouseX,user.mouseY,525,275,150,20)){levelMade.data[levelMade.selectedPart].size[0]=numberSlider(part.size[0],0,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,295,150,20)){levelMade.data[levelMade.selectedPart].size[1]=numberSlider(part.size[1],0,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,315,150,20)){levelMade.data[levelMade.selectedPart].size[2]=numberSlider(part.size[2],0,Infinity,0.05)}
                        
                        ctx.fillText('R: '+(part.col[0]*255).toFixed(1),485,385)
                        ctx.fillText('G: '+(part.col[1]*255).toFixed(1),485,405)
                        ctx.fillText('B: '+(part.col[2]*255).toFixed(1),485,425)
                        if(button_center(user.mouseX,user.mouseY,525,385,150,20)){levelMade.data[levelMade.selectedPart].col[0]=numberSlider(part.col[0],0,1,0.01)}
                        if(button_center(user.mouseX,user.mouseY,525,405,150,20)){levelMade.data[levelMade.selectedPart].col[1]=numberSlider(part.col[1],0,1,0.01)}
                        if(button_center(user.mouseX,user.mouseY,525,425,150,20)){levelMade.data[levelMade.selectedPart].col[2]=numberSlider(part.col[2],0,1,0.01)}
                        
                        ctx.fillStyle=(part.useTex===undefined || part.useTex)?'rgb(255,255,255)':'rgb(175,175,175)'
                        ctx.fillRect(570,442.5,15,15)
                        if(user.mouseClicked && button(user.mouseX,user.mouseY,570,442.5,15,15)){levelMade.data[levelMade.selectedPart].useTex=!levelMade.data[levelMade.selectedPart].useTex}
                        
                        ctx.fillStyle='white'
                        ctx.textAlign='center'
                        ctx.fillText('Copy',525,495)
                        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,495,100,35)){levelMade.selectedPart=levelMade.data.length;levelMade.data.push({pos:part.pos.slice(),rot:part.rot.slice(),size:part.size.slice(),col:part.col.slice(),special:part.special,useTex:part.useTex});levelMade.selectGlow=2;return}
                    
                    break
                    
                    case 'glass':
                    case 'lava':
                        
                        ctx.fillText('Position',525,30)
                        ctx.fillText('Rotation',525,140)
                        ctx.fillText('Scale',525,250)
                        ctx.font='15px cursive'
                        
                        ctx.textAlign='start'
                        
                        ctx.fillText('X: '+part.pos[0].toFixed(2),485,55)
                        ctx.fillText('Y: '+part.pos[1].toFixed(2),485,75)
                        ctx.fillText('Z: '+part.pos[2].toFixed(2),485,95)
                        if(button_center(user.mouseX,user.mouseY,525,55,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,75,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,95,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                        
                        ctx.fillText('X: '+part.rot[0].toFixed(1),485,165)
                        ctx.fillText('Y: '+part.rot[1].toFixed(1),485,185)
                        ctx.fillText('Z: '+part.rot[2].toFixed(1),485,205)
                        if(button_center(user.mouseX,user.mouseY,525,165,150,20)){levelMade.data[levelMade.selectedPart].rot[0]=numberSlider(part.rot[0],0,360,1)}
                        if(button_center(user.mouseX,user.mouseY,525,185,150,20)){levelMade.data[levelMade.selectedPart].rot[1]=numberSlider(part.rot[1],0,360,1)}
                        if(button_center(user.mouseX,user.mouseY,525,205,150,20)){levelMade.data[levelMade.selectedPart].rot[2]=numberSlider(part.rot[2],0,360,1)}
                        
                        ctx.fillText('X: '+part.size[0].toFixed(2),485,275)
                        ctx.fillText('Y: '+part.size[1].toFixed(2),485,295)
                        ctx.fillText('Z: '+part.size[2].toFixed(2),485,315)
                        if(button_center(user.mouseX,user.mouseY,525,275,150,20)){levelMade.data[levelMade.selectedPart].size[0]=numberSlider(part.size[0],0,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,295,150,20)){levelMade.data[levelMade.selectedPart].size[1]=numberSlider(part.size[1],0,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,315,150,20)){levelMade.data[levelMade.selectedPart].size[2]=numberSlider(part.size[2],0,Infinity,0.05)}
                        
                    break
                    
                    case 'particleSystem':
                        
                        if(levelMade.pageOfParticleSystemData===0){
                            
                            ctx.font='20px cursive'
                            ctx.fillText('Position',525,20)
                            ctx.fillText('Scale',525,110)
                            ctx.font='13px cursive'
                            ctx.textAlign='start'
                            
                            ctx.fillText('X: '+part.pos[0].toFixed(2),485,40)
                            ctx.fillText('Y: '+part.pos[1].toFixed(2),485,60)
                            ctx.fillText('Z: '+part.pos[2].toFixed(2),485,80)
                            if(button_center(user.mouseX,user.mouseY,525,40,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.pos[0]=levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,60,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.pos[1]=levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,80,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.pos[2]=levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                            
                            ctx.fillText('X: '+part.size[0].toFixed(2),485,130)
                            ctx.fillText('Y: '+part.size[1].toFixed(2),485,150)
                            ctx.fillText('Z: '+part.size[2].toFixed(2),485,170)
                            if(button_center(user.mouseX,user.mouseY,525,130,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.size[0]=levelMade.data[levelMade.selectedPart].size[0]=numberSlider(part.size[0],0,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,150,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.size[1]=levelMade.data[levelMade.selectedPart].size[1]=numberSlider(part.size[1],0,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,170,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.size[2]=levelMade.data[levelMade.selectedPart].size[2]=numberSlider(part.size[2],0,Infinity,0.05)}
                            
                            ctx.fillText('Min Vel X: '+part.particleSystemData.minVelX.toFixed(2),475,200)
                            ctx.fillText('Min Vel Y: '+part.particleSystemData.minVelY.toFixed(2),475,220)
                            ctx.fillText('Min Vel Z: '+part.particleSystemData.minVelZ.toFixed(2),475,240)
                            if(button_center(user.mouseX,user.mouseY,525,200,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minVelX=numberSlider(part.particleSystemData.minVelX,-Infinity,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,220,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minVelY=numberSlider(part.particleSystemData.minVelY,-Infinity,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,240,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minVelZ=numberSlider(part.particleSystemData.minVelZ,-Infinity,Infinity,0.05)}
                            
                            ctx.fillText('Max Vel X: '+part.particleSystemData.maxVelX.toFixed(2),475,260)
                            ctx.fillText('Max Vel Y: '+part.particleSystemData.maxVelY.toFixed(2),475,280)
                            ctx.fillText('Max Vel Z: '+part.particleSystemData.maxVelZ.toFixed(2),475,300)
                            if(button_center(user.mouseX,user.mouseY,525,260,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxVelX=numberSlider(part.particleSystemData.maxVelX,-Infinity,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,280,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxVelY=numberSlider(part.particleSystemData.maxVelY,-Infinity,Infinity,0.05)}
                            if(button_center(user.mouseX,user.mouseY,525,300,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxVelZ=numberSlider(part.particleSystemData.maxVelZ,-Infinity,Infinity,0.05)}
                            
                            ctx.fillText('Min Col R: '+(part.particleSystemData.minR*255).toFixed(2),475,330)
                            ctx.fillText('Min Col G: '+(part.particleSystemData.minG*255).toFixed(2),475,350)
                            ctx.fillText('Min Col B: '+(part.particleSystemData.minB*255).toFixed(2),475,370)
                            if(button_center(user.mouseX,user.mouseY,525,330,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minR=numberSlider(part.particleSystemData.minR,0,1,0.0015)}
                            if(button_center(user.mouseX,user.mouseY,525,350,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minG=numberSlider(part.particleSystemData.minG,0,1,0.0015)}
                            if(button_center(user.mouseX,user.mouseY,525,370,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minB=numberSlider(part.particleSystemData.minB,0,1,0.0015)}
                            
                            ctx.fillText('Max Col R: '+(part.particleSystemData.maxR*255).toFixed(2),475,390)
                            ctx.fillText('Max Col G: '+(part.particleSystemData.maxG*255).toFixed(2),475,410)
                            ctx.fillText('Max Col B: '+(part.particleSystemData.maxB*255).toFixed(2),475,430)
                            if(button_center(user.mouseX,user.mouseY,525,390,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxR=numberSlider(part.particleSystemData.maxR,0,1,0.0015)}
                            if(button_center(user.mouseX,user.mouseY,525,410,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxG=numberSlider(part.particleSystemData.maxG,0,1,0.0015)}
                            if(button_center(user.mouseX,user.mouseY,525,430,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxB=numberSlider(part.particleSystemData.maxB,0,1,0.0015)}
                            ctx.lineCap='round'
                            ctx.lineJoin='round'
                            ctx.lineWidth=5
                            ctx.strokeStyle='white'
                            ctx.beginPath()
                            ctx.moveTo(515,490)
                            ctx.lineTo(535,500)
                            ctx.moveTo(515,510)
                            ctx.lineTo(535,500)
                            ctx.closePath()
                            ctx.stroke()
                            //hehehehe lol
                            ctx.lineCap='butt'
                            ctx.lineJoin='miter'
                            if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,525,500,50,50)){
                                levelMade.pageOfParticleSystemData=1
                            }
                            
                        } else {
                            
                            ctx.textAlign='start'
                            ctx.font='13px cursive'
                            
                            ctx.fillText('Min Life: '+part.particleSystemData.minLife.toFixed(2),475,20)
                            if(button_center(user.mouseX,user.mouseY,525,20,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minLife=numberSlider(part.particleSystemData.minLife,-Infinity,Infinity,0.05)}
                            ctx.fillText('Max Life: '+part.particleSystemData.maxLife.toFixed(2),475,40)
                            if(button_center(user.mouseX,user.mouseY,525,40,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxLife=numberSlider(part.particleSystemData.maxLife,-Infinity,Infinity,0.05)}
                            ctx.fillText('Gravity: '+(-part.particleSystemData.grav*50).toFixed(3),475,70)
                            if(button_center(user.mouseX,user.mouseY,525,70,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.grav=numberSlider(part.particleSystemData.grav,-Infinity,Infinity,0.00025)}
                            ctx.fillText('Spawn Delay: '+part.particleSystemData.productionRate,470,100)
                            if(button_center(user.mouseX,user.mouseY,525,100,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.productionRate=numberSlider(part.particleSystemData.productionRate,1,Infinity,1,true)}
                            
                            ctx.fillText('Min Size: '+part.particleSystemData.minSize.toFixed(2),475,130)
                            if(button_center(user.mouseX,user.mouseY,525,130,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.minSize=numberSlider(part.particleSystemData.minSize,-Infinity,Infinity,0.5)}
                            ctx.fillText('Max Size: '+part.particleSystemData.maxSize.toFixed(2),475,150)
                            if(button_center(user.mouseX,user.mouseY,525,150,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.maxSize=numberSlider(part.particleSystemData.maxSize,-Infinity,Infinity,0.5)}
                            
                            ctx.fillText('Spawn Amount: '+part.particleSystemData.batchAmount,470,180)
                            if(button_center(user.mouseX,user.mouseY,525,180,150,20)){levelMade.data[levelMade.selectedPart].particleSystemData.batchAmount=numberSlider(part.particleSystemData.batchAmount,1,Infinity,1,true)}
                            
                            ctx.lineCap='round'
                            ctx.lineJoin='round'
                            ctx.lineWidth=5
                            ctx.strokeStyle='white'
                            ctx.beginPath()
                            ctx.moveTo(535,490)
                            ctx.lineTo(515,500)
                            ctx.moveTo(535,510)
                            ctx.lineTo(515,500)
                            ctx.closePath()
                            ctx.stroke()
                            //hehehehe lol
                            ctx.lineCap='butt'
                            ctx.lineJoin='miter'
                            if(user.mouseClicked&&button_center(user.mouseX,user.mouseY,525,500,50,50)){
                                levelMade.pageOfParticleSystemData=0
                            }
                        }
                        
                    break
                    
                    case 'line':
                        
                        ctx.font='13px cursive'
                        ctx.textAlign='start'
                        
                        ctx.fillText('X1: '+part.lineData.p1[0].toFixed(2),485,20)
                        ctx.fillText('Y1: '+part.lineData.p1[1].toFixed(2),485,40)
                        ctx.fillText('Z1: '+part.lineData.p1[2].toFixed(2),485,60)
                        if(button_center(user.mouseX,user.mouseY,525,20,150,20)){levelMade.data[levelMade.selectedPart].lineData.p1[0]=numberSlider(part.lineData.p1[0],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,40,150,20)){levelMade.data[levelMade.selectedPart].lineData.p1[1]=numberSlider(part.lineData.p1[1],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,60,150,20)){levelMade.data[levelMade.selectedPart].lineData.p1[2]=numberSlider(part.lineData.p1[2],-Infinity,Infinity,0.05)}
                        ctx.fillText('X2: '+part.lineData.p2[0].toFixed(2),485,100)
                        ctx.fillText('Y2: '+part.lineData.p2[1].toFixed(2),485,120)
                        ctx.fillText('Z2: '+part.lineData.p2[2].toFixed(2),485,140)
                        if(button_center(user.mouseX,user.mouseY,525,100,150,20)){levelMade.data[levelMade.selectedPart].lineData.p2[0]=numberSlider(part.lineData.p2[0],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,120,150,20)){levelMade.data[levelMade.selectedPart].lineData.p2[1]=numberSlider(part.lineData.p2[1],-Infinity,Infinity,0.05)}
                        if(button_center(user.mouseX,user.mouseY,525,140,150,20)){levelMade.data[levelMade.selectedPart].lineData.p2[2]=numberSlider(part.lineData.p2[2],-Infinity,Infinity,0.05)}
                        ctx.fillText('Thickness1: '+part.lineData.thickness1.toFixed(2),475,180)
                        if(button_center(user.mouseX,user.mouseY,525,180,150,20)){levelMade.data[levelMade.selectedPart].lineData.thickness1=numberSlider(part.lineData.thickness1,-Infinity,Infinity,0.025)}
                        ctx.fillText('Thickness2: '+part.lineData.thickness2.toFixed(2),475,200)
                        if(button_center(user.mouseX,user.mouseY,525,200,150,20)){levelMade.data[levelMade.selectedPart].lineData.thickness2=numberSlider(part.lineData.thickness2,-Infinity,Infinity,0.025)}
                        
                        ctx.fillText('R1: '+(part.lineData.col1[0]*255).toFixed(2),485,240)
                        ctx.fillText('G1: '+(part.lineData.col1[1]*255).toFixed(2),485,260)
                        ctx.fillText('B1: '+(part.lineData.col1[2]*255).toFixed(2),485,280)
                        ctx.fillText('A1: '+(part.lineData.col1[3]*255).toFixed(2),485,300)
                        if(button_center(user.mouseX,user.mouseY,525,240,150,20)){levelMade.data[levelMade.selectedPart].lineData.col1[0]=numberSlider(part.lineData.col1[0],-Infinity,Infinity,0.0015)}
                        if(button_center(user.mouseX,user.mouseY,525,260,150,20)){levelMade.data[levelMade.selectedPart].lineData.col1[1]=numberSlider(part.lineData.col1[1],-Infinity,Infinity,0.0015)}
                        if(button_center(user.mouseX,user.mouseY,525,280,150,20)){levelMade.data[levelMade.selectedPart].lineData.col1[2]=numberSlider(part.lineData.col1[2],-Infinity,Infinity,0.0015)}
                        if(button_center(user.mouseX,user.mouseY,525,300,150,20)){levelMade.data[levelMade.selectedPart].lineData.col1[3]=numberSlider(part.lineData.col1[3],-Infinity,Infinity,0.0015)}
                        
                        ctx.fillText('R2: '+(part.lineData.col2[0]*255).toFixed(2),485,340)
                        ctx.fillText('G2: '+(part.lineData.col2[1]*255).toFixed(2),485,360)
                        ctx.fillText('B2: '+(part.lineData.col2[2]*255).toFixed(2),485,380)
                        ctx.fillText('A2: '+(part.lineData.col2[3]*255).toFixed(2),485,400)
                        if(button_center(user.mouseX,user.mouseY,525,340,150,20)){levelMade.data[levelMade.selectedPart].lineData.col2[0]=numberSlider(part.lineData.col2[0],-Infinity,Infinity,0.0015)}
                        if(button_center(user.mouseX,user.mouseY,525,360,150,20)){levelMade.data[levelMade.selectedPart].lineData.col2[1]=numberSlider(part.lineData.col2[1],-Infinity,Infinity,0.0015)}
                        if(button_center(user.mouseX,user.mouseY,525,380,150,20)){levelMade.data[levelMade.selectedPart].lineData.col2[2]=numberSlider(part.lineData.col2[2],-Infinity,Infinity,0.0015)}
                        if(button_center(user.mouseX,user.mouseY,525,400,150,20)){levelMade.data[levelMade.selectedPart].lineData.col2[3]=numberSlider(part.lineData.col2[3],-Infinity,Infinity,0.0015)}
                        ctx.fillText('X Scale: '+part.lineData.widthScale.toFixed(2),475,440)
                        if(button_center(user.mouseX,user.mouseY,525,440,150,20)){levelMade.data[levelMade.selectedPart].lineData.widthScale=numberSlider(part.lineData.widthScale,-Infinity,Infinity,0.025)}
                        ctx.fillText('Y Scale: '+part.lineData.heightScale.toFixed(2),475,460)
                        if(button_center(user.mouseX,user.mouseY,525,460,150,20)){levelMade.data[levelMade.selectedPart].lineData.heightScale=numberSlider(part.lineData.heightScale,-Infinity,Infinity,0.025)}
                        ctx.fillText('Detail: '+part.lineData.detail,475,490)
                        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,490,150,20)){levelMade.data[levelMade.selectedPart].lineData.detail=({Low:'Medium',Medium:'High',High:'Low'})[levelMade.data[levelMade.selectedPart].lineData.detail]}
                        
                        ctx.font='16px cursive'
                        ctx.fillText('Copy',500,515)
                        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,515,150,20)){levelMade.selectedPart=levelMade.data.length;levelMade.selectGlow=2;levelMade.data.push({render:false,pos:part.pos,size:part.size,rot:part.rot,col:part.col,special:part.special,lineData:{p1:part.lineData.p1.slice(),p2:part.lineData.p2.slice(),thickness1:part.lineData.thickness1,thickness2:part.lineData.thickness2,col1:part.lineData.col1.slice(),col2:part.lineData.col2.slice(),widthScale:part.lineData.widthScale,heightScale:part.lineData.heightScale,detail:part.lineData.detail}})}
                        
                        
                    break
                }
                
            break
            
            case 'weapon':
                
                ctx.fillText('Position',525,30)
                ctx.fillText('Rotation',525,150)
                ctx.font='15px cursive'
                
                ctx.textAlign='start'
                
                ctx.fillText('X: '+part.pos[0].toFixed(2),485,65)
                ctx.fillText('Y: '+part.pos[1].toFixed(2),485,85)
                ctx.fillText('Z: '+part.pos[2].toFixed(2),485,105)
                if(button_center(user.mouseX,user.mouseY,525,65,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,85,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,105,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                part.partInfo.pos=levelMade.data[levelMade.selectedPart].pos.slice()
                
                ctx.fillText('X: '+part.rot[0].toFixed(1),485,175)
                ctx.fillText('Y: '+part.rot[1].toFixed(1),485,195)
                ctx.fillText('Z: '+part.rot[2].toFixed(1),485,215)
                if(button_center(user.mouseX,user.mouseY,525,175,150,20)){levelMade.data[levelMade.selectedPart].rot[0]=numberSlider(part.rot[0],0,360,1)}
                if(button_center(user.mouseX,user.mouseY,525,195,150,20)){levelMade.data[levelMade.selectedPart].rot[1]=numberSlider(part.rot[1],0,360,1)}
                if(button_center(user.mouseX,user.mouseY,525,215,150,20)){levelMade.data[levelMade.selectedPart].rot[2]=numberSlider(part.rot[2],0,360,1)}
                part.partInfo.rot=levelMade.data[levelMade.selectedPart].rot.slice()
                
                ctx.font='16px cursive'
                ctx.textAlign='center'
                ctx.fillText('Type:',515,250)
                ctx.fillText(MATH.getWeaponName(part.partInfo.type),525,270)
                if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,260,150,40)){part.partInfo.type=MATH.rotateToNewWeapon(part.partInfo.type)}
                
            break
            
            case 'box':
                
                ctx.fillText('Position',525,30)
                ctx.fillText('Rotation',525,150)
                ctx.fillText('Scale',525,270)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+part.pos[0].toFixed(2),485,65)
                ctx.fillText('Y: '+part.pos[1].toFixed(2),485,85)
                ctx.fillText('Z: '+part.pos[2].toFixed(2),485,105)
                if(button_center(user.mouseX,user.mouseY,525,65,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,85,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,105,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                part.partInfo.pos=levelMade.data[levelMade.selectedPart].pos.slice()
                
                ctx.fillText('X: '+part.rot[0].toFixed(1),485,175)
                ctx.fillText('Y: '+part.rot[1].toFixed(1),485,195)
                ctx.fillText('Z: '+part.rot[2].toFixed(1),485,215)
                if(button_center(user.mouseX,user.mouseY,525,175,150,20)){levelMade.data[levelMade.selectedPart].rot[0]=numberSlider(part.rot[0],0,360,1)}
                if(button_center(user.mouseX,user.mouseY,525,195,150,20)){levelMade.data[levelMade.selectedPart].rot[1]=numberSlider(part.rot[1],0,360,1)}
                if(button_center(user.mouseX,user.mouseY,525,215,150,20)){levelMade.data[levelMade.selectedPart].rot[2]=numberSlider(part.rot[2],0,360,1)}
                part.partInfo.rot=levelMade.data[levelMade.selectedPart].rot.slice()
                
                ctx.fillText('X: '+part.size[0].toFixed(2),485,305)
                ctx.fillText('Y: '+part.size[1].toFixed(2),485,325)
                ctx.fillText('Z: '+part.size[2].toFixed(2),485,345)
                if(button_center(user.mouseX,user.mouseY,525,305,150,20)){levelMade.data[levelMade.selectedPart].size[0]=numberSlider(part.size[0],0,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,325,150,20)){levelMade.data[levelMade.selectedPart].size[1]=numberSlider(part.size[1],0,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,345,150,20)){levelMade.data[levelMade.selectedPart].size[2]=numberSlider(part.size[2],0,Infinity,0.05)}
                part.partInfo.size=levelMade.data[levelMade.selectedPart].size.slice()
                
                ctx.font='16px cursive'
                ctx.fillText('Mass: '+part.partInfo.mass.toFixed(2),475,395)
                if(button_center(user.mouseX,user.mouseY,525,395,150,20)){levelMade.data[levelMade.selectedPart].partInfo.mass=numberSlider(part.partInfo.mass,0,Infinity,0.02)}
                
            break
            
            case 'sphere':
                
                ctx.fillText('Position',525,30)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+part.pos[0].toFixed(2),485,65)
                ctx.fillText('Y: '+part.pos[1].toFixed(2),485,85)
                ctx.fillText('Z: '+part.pos[2].toFixed(2),485,105)
                if(button_center(user.mouseX,user.mouseY,525,65,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,85,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,105,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                part.partInfo.pos=levelMade.data[levelMade.selectedPart].pos.slice()
                
                ctx.font='16px cursive'
                ctx.fillText('Radius: '+part.partInfo.radius.toFixed(2),475,145)
                if(button_center(user.mouseX,user.mouseY,525,145,150,20)){levelMade.data[levelMade.selectedPart].partInfo.radius=numberSlider(part.partInfo.radius,0,Infinity,0.025)}
                levelMade.data[levelMade.selectedPart].size[0]=levelMade.data[levelMade.selectedPart].partInfo.radius
                levelMade.data[levelMade.selectedPart].size[1]=levelMade.data[levelMade.selectedPart].partInfo.radius
                levelMade.data[levelMade.selectedPart].size[2]=levelMade.data[levelMade.selectedPart].partInfo.radius
                
                ctx.fillText('Mass: '+part.partInfo.mass.toFixed(2),475,175)
                if(button_center(user.mouseX,user.mouseY,525,175,150,20)){levelMade.data[levelMade.selectedPart].partInfo.mass=numberSlider(part.partInfo.mass,0,Infinity,0.02)}
                
            break
            
            case 'enemy':
                
                ctx.fillText('Position',525,30)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+part.pos[0].toFixed(2),485,65)
                ctx.fillText('Y: '+part.pos[1].toFixed(2),485,85)
                ctx.fillText('Z: '+part.pos[2].toFixed(2),485,105)
                if(button_center(user.mouseX,user.mouseY,525,65,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,85,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,105,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                part.partInfo.pos=levelMade.data[levelMade.selectedPart].pos.slice()
                
                ctx.font='16px cursive'
                ctx.textAlign='center'
                ctx.fillText('Weapon:',507,250)
                ctx.fillText(MATH.getWeaponName(part.partInfo.weapon),525,270)
                if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,260,150,40)){part.partInfo.weapon=MATH.rotateToNewWeapon(part.partInfo.weapon);while(['candycane','grapplingHook','sword','reverse','banana','shard','wand'].indexOf(part.partInfo.weapon)>-1){part.partInfo.weapon=MATH.rotateToNewWeapon(part.partInfo.weapon)}}
                
            break
            
            case 'barrel':
                
                ctx.fillText('Position',525,30)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+part.pos[0].toFixed(2),485,65)
                ctx.fillText('Y: '+part.pos[1].toFixed(2),485,85)
                ctx.fillText('Z: '+part.pos[2].toFixed(2),485,105)
                if(button_center(user.mouseX,user.mouseY,525,65,150,20)){levelMade.data[levelMade.selectedPart].pos[0]=numberSlider(part.pos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,85,150,20)){levelMade.data[levelMade.selectedPart].pos[1]=numberSlider(part.pos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,105,150,20)){levelMade.data[levelMade.selectedPart].pos[2]=numberSlider(part.pos[2],-Infinity,Infinity,0.05)}
                part.partInfo.pos=levelMade.data[levelMade.selectedPart].pos.slice()
                
            break
        }
        
    } else if(levelMade.selectedPart){
        
        ctx.fillText('Done',525,580)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,580,120,50)){levelMade.selectedPart=null;return}
        
        switch(levelMade.selectedPart){
            
            case 'light':
                
                ctx.fillStyle='rgb(255,255,255)'
                ctx.font='25px cursive'
                ctx.fillText('Position',525,30)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+levelMade.lightPos[0].toFixed(2),485,55)
                ctx.fillText('Y: '+levelMade.lightPos[1].toFixed(2),485,75)
                ctx.fillText('Z: '+levelMade.lightPos[2].toFixed(2),485,95)
                if(button_center(user.mouseX,user.mouseY,525,55,150,20)){levelMade.lightPos[0]=numberSlider(levelMade.lightPos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,75,150,20)){levelMade.lightPos[1]=numberSlider(levelMade.lightPos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,95,150,20)){levelMade.lightPos[2]=numberSlider(levelMade.lightPos[2],-Infinity,Infinity,0.05)}
                
            break
            
            case 'spawn':
                
                ctx.fillStyle='rgb(255,255,255)'
                ctx.font='25px cursive'
                ctx.fillText('Position',525,30)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+levelMade.spawnPos[0].toFixed(2),485,55)
                ctx.fillText('Y: '+levelMade.spawnPos[1].toFixed(2),485,75)
                ctx.fillText('Z: '+levelMade.spawnPos[2].toFixed(2),485,95)
                if(button_center(user.mouseX,user.mouseY,525,55,150,20)){levelMade.spawnPos[0]=numberSlider(levelMade.spawnPos[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,75,150,20)){levelMade.spawnPos[1]=numberSlider(levelMade.spawnPos[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,95,150,20)){levelMade.spawnPos[2]=numberSlider(levelMade.spawnPos[2],-Infinity,Infinity,0.05)}
                
            break
            
            case 'milk':
                
                ctx.fillStyle='rgb(255,255,255)'
                ctx.font='25px cursive'
                ctx.fillText('Position',525,30)
                ctx.font='15px cursive'
                ctx.textAlign='start'
                
                ctx.fillText('X: '+levelMade.milk[0].toFixed(2),485,55)
                ctx.fillText('Y: '+levelMade.milk[1].toFixed(2),485,75)
                ctx.fillText('Z: '+levelMade.milk[2].toFixed(2),485,95)
                if(button_center(user.mouseX,user.mouseY,525,55,150,20)){levelMade.milk[0]=numberSlider(levelMade.milk[0],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,75,150,20)){levelMade.milk[1]=numberSlider(levelMade.milk[1],-Infinity,Infinity,0.05)}
                if(button_center(user.mouseX,user.mouseY,525,95,150,20)){levelMade.milk[2]=numberSlider(levelMade.milk[2],-Infinity,Infinity,0.05)}
                
            break
        }
        
    } else {
        
        ctx.font='20px cursive'
        
        ctx.fillText('Add Wall',525,35)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,35,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,rot:[0,0,0],size:[1,1,1],col:[Math.random(),Math.random(),Math.random()]})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Weapon',525,70)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,70,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,rot:[0,0,0],size:[0.2,0.2,0.2],col:[0.4,0.4,0.4],useTex:false,partInfo:{instance:'weapon',type:'gun',pos:p.slice()}})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Box',525,105)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,105,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,rot:[0,0,0],size:[1,1,1],col:[0.1,0.3,0.9],useTex:false,partInfo:{instance:'box',pos:p.slice(),mass:1}})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Ball',525,140)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,140,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[1,1,1],col:[0.1,0.3,0.9],rot:[0,0,0],useTex:false,partInfo:{instance:'sphere',pos:p.slice(),mass:1,radius:0.5}})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Enemy',525,175)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,175,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[0.75,1.325,0.75],col:[0.1,0.3,0.9],rot:[0,0,0],useTex:false,partInfo:{instance:'enemy',pos:p.slice(),weapon:'gun'}})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Barrel',525,205)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,205,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[0.75,1.325,0.75],col:[1,0,0],rot:[0,0,0],useTex:false,partInfo:{instance:'barrel',pos:p.slice()}})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Glass',525,240)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,240,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[1,1,1],col:[0.15,0.4,1],rot:[0,0,0],useTex:false,special:'glass'})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Add Lava',525,275)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,275,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[1,1,1],col:[2,0,0],rot:[0,0,0],useTex:false,special:'lava'})
            levelMade.selectGlow=2
            return
        }
        ctx.fillText('Set Light',525,305)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,305,120,35)){
            levelMade.selectedPart='light'
            return
        }
        ctx.fillText('Set Spawn',525,340)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,340,120,35)){
            levelMade.selectedPart='spawn'
            return
        }
        ctx.fillText('Set Milk',525,375)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,375,120,35)){
            levelMade.selectedPart='milk'
            return
        }
        ctx.fillText('Add Particles',525,405)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,405,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[1,1,1],col:[0,0,0],rot:[0,0,0],useTex:false,render:false,special:'particleSystem',particleSystemData:{pos:p.slice(),size:[1,1,1],minVelX:-0.2,maxVelX:0.2,minVelY:-0.2,maxVelY:0.2,minVelZ:-0.2,maxVelZ:0.2,minR:0,maxR:1,minG:0,maxG:1,minB:0,maxB:1,minLife:15,maxLife:30,grav:0,minSize:10,maxSize:100,productionRate:6,batchAmount:1}})
            levelMade.selectGlow=2
            levelMade.pageOfParticleSystemData=0
            return
        }
        
        ctx.fillText('Add Line',525,440)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,440,120,35)){
            
            let r=5,p=[player.body.position.x+player.lookDir[0]*r,player.body.position.y+player.height+player.lookDir[1]*r,player.body.position.z+player.lookDir[2]*r]
            levelMade.selectedPart=levelMade.data.length
            levelMade.data.push({pos:p,size:[1,1,1],col:[0,0,0],rot:[0,0,0],useTex:false,render:false,special:'line',lineData:{p1:[p[0],p[1],p[2]-0.75],p2:[p[0],p[1],p[2]+0.75],thickness1:0.25,thickness2:0.25,col1:[0,0,0,1],col2:[0,0,0,1],widthScale:1,heightScale:1,detail:'Low'}})
            levelMade.selectGlow=2
            return
        }
        
    }
    
    ctx.textAlign='center'
    if(levelMade.selectedPart===null||typeof levelMade.selectedPart==='number'){
        
        ctx.fillStyle='white'
        ctx.textAlign='center'
        ctx.font='17.5px cursive'
        ctx.fillText('Select Part',525,545)
        if(user.mouseClicked && button_center(user.mouseX,user.mouseY,525,545,120,40)){
            
            if(user.mouseButton===0){
                
                levelMade.selectedPart=(levelMade.selectedPart+1)%levelMade.data.length
                
            } else {
                
                levelMade.selectedPart=(levelMade.selectedPart+(levelMade.data.length-1))%levelMade.data.length
            }
            
            levelMade.selectGlow=2
            levelMade.pageOfParticleSystemData=0
        }
        
        
    }
    
    levelMade.selectGlow=Math.max(levelMade.selectGlow-0.05,0.01)
    
}

let documentLevelStringElement=document.getElementById('levelStringText')

printDataString4Scene=function(){
    
    ctx.fillStyle='rgb(200,200,200)'
    ctx.fillRect(0,0,600,600)
    ctx.fillStyle='black'
    ctx.font='16px cursive'
    ctx.textAlign='start'
    ctx.fillText('Copy the save code                                press "B" to go back to the title screen',5,20)
    ctx.font='13px cursive'
    ctx.fillText('Press CTRL+A to highlight all of the code',5,50)
    
    documentLevelStringElement.style.display='block'
    documentLevelStringElement.style.margin='0px'
    documentLevelStringElement.innerHTML=printLevelString(levelMade.data,levelMade.lightPos,levelMade.spawnPos,levelMade.milk)
}

scenes.levelMadeString=function(){
    
    if(user.keys.b){
        
        ctx.textAlign='start'
        documentLevelStringElement.style.display='none'
        initTitleScreen()
        currentScene='title'
        
    }
}

scenes.enterLevelData=function(){
    
    ctx.fillStyle='rgb(80,80,80)'
    ctx.fillRect(0,0,600,600)
    
    if(user.keys.b){
        
        ctx.textAlign='start'
        enterLevelDataPage.style.display='none'
        currentScene='title'
        initTitleScreen()
    }
}

scenes.enterLevelData_creator=function(){
    
    ctx.fillStyle='rgb(80,80,80)'
    ctx.fillRect(0,0,600,600)
    
    if(user.keys.b){
        
        enterLevelDataPage.style.display='none'
        currentScene='levelCreator'
        initTitleScreen()
    }
}

if(width===600&&height===600&&!window.thisProgramIsInFullScreen){
    
    currentScene='enterFullScreen'
    fullScreenPage.style.display='block'
}

scenes.enterFullScreen=function(){
    
    ctx.fillStyle='rgb(80,80,80)'
    ctx.fillRect(0,0,600,600)
}

let then
function loop(now){
    
    frameCount++
    
    if(!then){now=1;then=now;}
    
    if(currentScene!=='play'){
        
        player.timeMultiplier=1
        player.timeTimer=0
    }
    
    dt=(now-then)*0.01*player.timeMultiplier
    
    TIME+=dt
    
    scenes[currentScene]()
    
    user.update()
    
    then=now
    window.parent.raf=window.requestAnimationFrame(loop)
}

if(window.parent.raf){
    
    window.cancelAnimationFrame(window.parent.raf)
}

loop()


}

Karlson()


</script>


</html>