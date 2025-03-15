import React, { useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  findNodeHandle,
  UIManager,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const Jump = () => {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef(null);
  const paragraphRefs = useRef({});

  const htmlData = `
    <p>This is an introduction paragraph.</p>
    <p><a href="#jpara-13">Jump to paragraph 13</a></p>
    ${Array.from({ length: 35 }, (_, i) =>
      `<p id="jpara-${i + 1}" class="jpara">Paragraph ${i + 1}</p>`
    ).join("")}
  `;

  const handleLinkPress = (event, href) => {
    if (href.startsWith("#")) {
      event.preventDefault(); // Prevent the default behavior
      const id = href.substring(1); // Extract "jpara-13" from "#jpara-13"
      const targetRef = paragraphRefs.current[id];

      if (targetRef) {
        targetRef.measureLayout(
          scrollViewRef.current,
          (x, y) => {
            scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
          }
        );
      }
    }
  };

  return (
    <ScrollView ref={scrollViewRef} style={{ padding: 10 }}>
      <RenderHtml
        contentWidth={width}
        source={{ html: htmlData }}
        onLinkPress={handleLinkPress} // Handle anchor links properly
        enableExperimentalMarginCollapsing={true}
        renderers={{
          p: ({ TDefaultRenderer, ...props }) => {
            const { id } = props.tnode.attributes;
            return (
              <View
                ref={(el) => {
                  if (id) paragraphRefs.current[id] = el;
                }}
                style={{ marginVertical: 10 }}
              >
                <TDefaultRenderer {...props} />
              </View>
            );
          },
        }}
      />
    </ScrollView>
  );
};

export default Jump;
