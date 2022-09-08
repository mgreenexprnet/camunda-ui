import React, { useEffect } from "react";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";

let modeler;

const ReactEditor = () => {
  useEffect(() => {
    (async () => {
      const BpmnModeler = (await import("bpmn-js/lib/Modeler")).default;

      const BpmnPropertiesPanelModules = await import(
        "bpmn-js-properties-panel"
      );

      if (!modeler)
        modeler = new BpmnModeler({
          container: "#canvas",
          propertiesPanel: {
            parent: "#properties",
          },
          additionalModules: [
            BpmnPropertiesPanelModules.BpmnPropertiesPanelModule,
            BpmnPropertiesPanelModules.BpmnPropertiesProviderModule,
          ],
        });
    })();

    return () => {
      if (modeler) modeler.destroy();
    };
  }, []);

  return (
    <div style={{ background: "white", width: "100vw", height: "100vh" }}>
      <div className="modeler" style={{ height: "100%", width: "100%" }}>
        <div id="canvas" style={{ height: "100%", width: "100%" }}></div>
        <div id="properties"></div>
      </div>
    </div>
  );
};

export default ReactEditor;
