import { mapMutations } from "vuex";
import { reactive, ref, onMounted} from "vue";
import { useRoute } from 'vue-router';

export default function useShortcuts() {
  const route = useRoute();
  const commands = ref([]);
  const { undo } = mapMutations(["undo"]);
  const moveUp = () => {
    // logic for moving up annotations
  };
  
    const annotator = (() =>  {
        return [
        {
            title: "General",
            default: ["arrowup"],
            function: moveUp,
            name: "Move Up Annotations",
         },
        ];
      });

  /*
  const annotator = (() =>  {
         return [
        {
          title: "General",
          default: ["arrowup"],
          function: moveUp,
          name: "Move Up Annotations",
        },
        {
          default: ["arrowdown"],
          function: this.moveDown,
          name: "Move Down Annotations",
        },
        {
          default: ["arrowright"],
          function: this.stepIn,
          name: "Expand Category",
        },
        {
          default: ["arrowleft"],
          function: this.stepOut,
          name: "Collapse Category",
        },
        {
          default: ["space"],
          name: "New Annotation",
          function: () => {
            if (currentCategory) {
              currentCategory.createAnnotation();
            }
          },
        },
        {
          default: ["backspace"],
          name: "Delete Current Annotation",
          function: () => {
            if (currentAnnotation) {
              let currentKeypoint = currentAnnotation.currentKeypoint;
              if (currentKeypoint) {
                currentAnnotation.keypoints.deleteKeypoint(
                  currentKeypoint
                );
                currentAnnotation.tagRecomputeCounter++;
                currentAnnotation.currentKeypoint = null;
              } else {
                currentAnnotation.deleteAnnotation();
              }
            }
          },
        },
        {
          default: ["control", "z"],
          name: "Undo Last Action",
          function: undo,
        },
        {
          default: ["s"],
          name: "Select Tool",
          function: () => {
            activeTool = "Select";
          },
        },
        {
          default: ["r"],
          name: "BBox Tool",
          function: () => {
            if (!$refs.polygon.isDisabled) activeTool = "BBox";
          },
        },
        {
          default: ["n"],
          name: "Next Image",
          function: nextImage,
        },
        {
          default: ["p"],
          name: "Previous Image",
          function: previousImage,
        },
        {
          default: ["v"],
          name: "Polygon Tool",
          function: () => {
            if (!$refs.polygon.isDisabled) activeTool = "Polygon";
          },
        },

        {
          default: ["w"],
          name: "Magic Wand Tool",
          function: () => {
            if (!$refs.magicwand.isDisabled)
              activeTool = "Magic Wand";
          },
        },
        {
          default: ["k"],
          name: "Keypoints Tool",
          function: () => {
            if (!$refs.magicwand.isDisabled) activeTool = "Keypoints";
          },
        },
        {
          default: ["b"],
          name: "Brush Tool",
          function: () => {
            if (!$refs.brush.isDisabled) activeTool = "Brush";
          },
        },
        {
          default: ["e"],
          name: "Eraser Tool",
          function: () => {
            if (!$refs.eraser.isDisabled) activeTool = "Eraser";
          },
        },
        {
          default: ["c"],
          name: "Center Image",
          function: fit,
        },
        {
          default: ["control", "s"],
          name: "Save",
          function: save,
        },
        {
          title: "BBox Tool Shortcuts",
          default: ["escape"],
          name: "Remove Current BBox",
          function: $refs.bbox.deleteBbox,
        },
        {
          title: "Polygon Tool Shortcuts",
          default: ["escape"],
          name: "Remove Current Polygon",
          function: $refs.polygon.deletePolygon,
        },
        {
          title: "Eraser Tool Shortcuts",
          default: ["["],
          name: "Increase Radius",
          function: $refs.eraser.increaseRadius,
        },
        {
          default: ["]"],
          name: "Decrease Radius",
          function: $refs.eraser.decreaseRadius,
        },
        {
          title: "Brush Tool Shortcuts",
          default: ["["],
          name: "Increase Radius",
          function: $refs.brush.increaseRadius,
        },
        {
          default: ["]"],
          name: "Decrease Radius",
          function: $refs.brush.decreaseRadius,
        },
        {
          title: "Magic Tool Shortcuts",
          default: ["shift", "click"],
          name: "Subtract Selection",
          readonly: true,
        },
      ];
    });
    */
    
    onMounted(() => {
        if (route.name === "annotate") {
            commands.value = annotator();
        }
    });
    
  return {
    commands,
    undo,
    annotator,
  };
}
