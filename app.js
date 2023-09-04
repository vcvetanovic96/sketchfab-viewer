const getNodeByName = (nodemap, nodename) => {
  return Object.values(nodemap).find((node) => {
    if (node.type === "MatrixTransform" && node.name === nodename) {
      return node;
    }
  });
};

const addClickEvent = (api, instanceID) => {
  // Perform an action whenever the iframe is clicked
  let isVisible = true;
  api.addEventListener(
    "click",
    function (info) {
      console.log(info);
      // show or hide an object
      if (isVisible === true) {
        api.hide(instanceID);
      } else {
        api.show(instanceID);
      }
      isVisible = !isVisible;
    },
    { pick: "fast" }
  );
};

const success = (api) => {
  api.start(function () {
    api.addEventListener("viewerready", function () {
      api.getNodeMap(function (err, nodes) {
        console.log(nodes);
        const tire = getNodeByName(nodes, "tire_mat4_01");
        addClickEvent(api, tire.instanceID);
      });

      api.getMaterialList(function (err, materials) {
        let material = materials.find((element) => element.name === "body");
        console.log(material.channels);
        material.channels.EmitColor.factor = 1;
        material.channels.EmitColor.enable = "true";
        material.channels.EmitColor.color = [0, 128, 0];
        api.setMaterial(material);
      });
    });
  });
};

const loadSketchfab = (sceneuid, elementId) => {
  const iframe = document.getElementById(elementId);
  const client = new Sketchfab("1.12.1", iframe);

  client.init(sceneuid, {
    success: success,
    error: () => console.error("Sketchfab API error"),
    ui_stop: 0,
    preload: 1,
    camera: 0,
  });
};

loadSketchfab("27d0ec784ceb4c80a03cc17ebea8acb4", "api-frame");
