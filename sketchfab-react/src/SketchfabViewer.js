import React, { useEffect, useRef } from "react";

// Our wonderful chair model
const MODEL_UID = "b5cfed180f6643c395de8157c52e0afe";

const options = {
  autostart: 1,
  autospin: 0.2,
  ui_controls: 0,
  ui_infos: 0,
  ui_watermark: 0,
  ui_stop: 0,
};

export default function SketchfabViewer({ apiRef }) {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);

  const ViewerIframe = (
    <iframe
      // We feed the ref to the iframe component to get the underlying DOM object
      ref={viewerIframeRef}
      title="sketchfab-viewer"
      style={{ height: "100%", width: "100%" }}
    />
  );

  useEffect(
    () => {
      // Initialize the viewer
      let client = new window.Sketchfab(viewerIframeRef.current);
      client.init(MODEL_UID, {
        ...options,
        success: (api) => {
          apiRef.current = api;
        },
        error: () => {
          console.log("Viewer error");
        },
      });
    },
    // We only want to initialize the viewer on first load, so we don't add any dependencies to useEffect
    []
  );

  return ViewerIframe;
}
