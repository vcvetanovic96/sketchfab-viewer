// This function is run when the sketchfab client has been
// initialized
const success = (api) => {
    // api.start will start loading the 3D model
    api.start(() => console.log("Sketchfab scene starts loading"));
    api.addEventListener("viewerready", () => console.log("Sketchfab scene is ready"))
  };
  
  const loadSketchfab = (sceneuid, elementId) => {
    // To get started with Sketchfab, we need to create a client
    // object for a certain iframe in the DOM
    const iframe = document.getElementById(elementId);
    const client = new Sketchfab("1.12.1", iframe);
  
    // Then we can initialize the client with a specific model
    // and some player parameters
    client.init(sceneuid, {
      success: success,
      error: () => console.error("Sketchfab API error"),
      ui_stop: 0,
      preload: 1,
      camera: 0
    });
  };
  
  loadSketchfab("2161ffd41a074c3e8c3d78783b2f2902", "api-frame");
  