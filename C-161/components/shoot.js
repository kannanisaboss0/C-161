//----------------------------------------------------------------Bowling Pin's Revenge----------------------------------------------------------------//
//-----------------------------------------------------------------------shoot.js---------------------------------------------------------------//

//Registering a component to create the shot mechanism of the ball
AFRAME.registerComponent("ball-shooter",{

    //Schema
    schema:{},

    //Calling the init function
    init:function(){

        //Adding a global event listener to listen to a "keydown" event
        window.addEventListener("keydown",(e)=>{

            //Verifying whether the keycode of the key pressed is 32 or not
            ////Case-1 -The keycode is 32
            if(e.keyCode===32){
               
                //Creating an entity element
                bowling_ball_el=document.createElement("a-entity")

                //Adding a bowling ball gltf-model to the entity and a position slightly above ground
                bowling_ball_el.setAttribute("gltf-model","./models/ball/scene.gltf")
                bowling_ball_el.setAttribute("position","0 1.3 0")

                //Setting a random id to the entity
                bowling_ball_el.setAttribute("id",`ball${Math.random(0,1)}`)


                //Sourcing the scene element and and appending the entity as a child to it
                scene_el=document.querySelector("#scene_wrld")
                scene_el.appendChild(bowling_ball_el)

                //Adding an event listener to the entity that activates on the entity's collision
                bowling_ball_el.addEventListener("collide",(e)=>{

                   //Veriyfing whether the id of the collided body is "main_pin"
                   ////Case-1 -The id is "main_pin"
                   if(e.detail.body.el.id==="main_pin"){

                       //Sourcing the main pin element and removing it 
                       main_pin_el=document.querySelector("#main_pin")
                       main_pin_el.remove()

                       //Sourcing the plane element and setting the custom componet 'showPins'
                       plane_el=document.querySelector("#plane")
                       plane_el.setAttribute("pin-spawner",{showPins:true})

                       //Sourcing the text element and changing its "value property"
                       text_el=document.querySelector("#prompt_text")
                       text_el.setAttribute("text","value:HAHA YOU ARE NOW TRAPPED")
                   }
                })

                //Getting the camera's position
                camera_el_position=document.querySelector("#camera_player").object3D
                
                //Creating a vector, and integrating with the camera's
                var vectors= new THREE.Vector3()
                camera_el_position.getWorldDirection(vectors)

                //Make the bowling ball a dynamic body with velocity in the camera's direction
                bowling_ball_el.setAttribute("velocity",vectors.multiplyScalar(-7))
                bowling_ball_el.setAttribute("dynamic-body",{shape:"sphere",sphereRadius:"0.2"})
            }
        })
    }
})

//-----------------------------------------------------------------------shoot.js---------------------------------------------------------------//
//----------------------------------------------------------------Bowling Pin's Revenge----------------------------------------------------------------//
