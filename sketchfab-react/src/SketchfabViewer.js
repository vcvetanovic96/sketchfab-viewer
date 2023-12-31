import React, { useEffect, useRef } from "react";

const MODEL_UID = "b5cfed180f6643c395de8157c52e0afe";

const options = {
  autostart: 1,
  autospin: 0,
  ui_controls: 0,
  ui_infos: 0,
  ui_watermark: 0,
  ui_stop: 0,
};

const BRACELET_OPTION = {
  blue: "option_bracelet_rubberblue",
  white: "option_bracelet_rubberwhite",
  cuir: "option_bracelet_cuir",
};

const COQUE_OPTION = {
  gold: "option_coque_goldgloss",
  silverRough: "option_coque_silverrough",
  silverGlossy: "option_coque_silverglossy",
};

export default function SketchfabViewer({ apiRef, initOptions }) {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);

  const SketchfabViewer = (
    <iframe
      // We feed the ref to the iframe component to get the underlying DOM object
      ref={viewerIframeRef}
      title="sketchfab-viewer"
      style={{ height: "100%", width: "100%" }}
    />
  );

  const handleNodeMap = (apiRef) => {
    apiRef.current.getNodeMap((err, nodeMap) => {
      const blueBracelet = findNode(nodeMap, BRACELET_OPTION.blue);
      const whiteBracelet = findNode(nodeMap, BRACELET_OPTION.white);
      const cuirBracelet = findNode(nodeMap, BRACELET_OPTION.cuir);
      const goldCoque = findNode(nodeMap, COQUE_OPTION.gold);
      const silverRoughCoque = findNode(nodeMap, COQUE_OPTION.silverRough);
      const silverGlossyCoque = findNode(nodeMap, COQUE_OPTION.silverGlossy);

      setDefaultBraceletVisibility(apiRef.current, blueBracelet, whiteBracelet);
      setDefaultCoqueVisibility(apiRef.current, goldCoque, silverGlossyCoque);

      const braceletOptions = {
        blue: blueBracelet,
        white: whiteBracelet,
        cuir: cuirBracelet,
      };

      const coqueOptions = {
        gold: goldCoque,
        silverGlossy: silverGlossyCoque,
        silverRough: silverRoughCoque,
      };

      initOptions(braceletOptions, coqueOptions);
    });
  };

  const findNode = (nodemap, name) => {
    return Object.values(nodemap).find((node) => {
      return node.name === name && node.type === "MatrixTransform";
    });
  };

  const setDefaultBraceletVisibility = (
    apiRef,
    blueBracelet,
    whiteBracelet
  ) => {
    apiRef.hide(blueBracelet.instanceID);
    apiRef.hide(whiteBracelet.instanceID);
  };

  const setDefaultCoqueVisibility = (apiRef, goldCoque, silverGlossyCoque) => {
    apiRef.hide(goldCoque.instanceID);
    apiRef.hide(silverGlossyCoque.instanceID);
  };

  const handleMaterials = (apiRef) => {
    apiRef.current.getMaterialList((err, materials) => {
      console.log(materials);
    });
  };

  useEffect(
    () => {
      let client = new window.Sketchfab(viewerIframeRef.current);
      client.init(MODEL_UID, {
        ...options,
        success: (api) => {
          apiRef.current = api;
          apiRef.current.addEventListener("viewerready", () => {
            handleNodeMap(apiRef);
            handleMaterials(apiRef);
          });
        },
        error: () => {
          console.log("Viewer error");
        },
      });
    },
    // We only want to initialize the viewer on first load, so we don't add any dependencies to useEffect
    []
  );

  return SketchfabViewer;
}
