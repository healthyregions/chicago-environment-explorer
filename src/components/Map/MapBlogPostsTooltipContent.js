import React, {useEffect, useState} from 'react';
import Neighborhood from "./Neighborhood";


// This component handles and formats the map tooltip info regarding the clicked Blog Post.
// The props passed to this component should contain the hovered object (from deck, info.object by default),
// as well as a reference to the overlay that was clicked
const MapBlogPostsTooltipContent = ({content, overlay}) => {
    const [postMetadata, setPostMetadata] = useState(undefined);

    const popupLabels = JSON.parse(overlay.popupContent);
    const popupValues = content;
    const fields = Object.keys(popupLabels).map((key) => ({
        label: popupLabels[key],
        value: popupValues[key],
    }));

    useEffect(() => {
        if (!postMetadata) {
            try {
                fetch('/content/posts.json')
                  .then(r => r.json())
                  .then(results => results.find((res) => content.blog_slug === res.slug))
                  .then(result => setPostMetadata(result));
            } catch (e) {
                setPostMetadata([{ title: `Error: failed to fetch news post metadata - ${content.blog_slug}` }]);
            }
        }
    });

    return (
        <>
            <h2>{content?.title}</h2>
            {content && <div style={{ overflowY: 'scroll', maxHeight: '55vh' }}>
                <Neighborhood popupFields={fields} overlay={overlay} postMetadata={postMetadata} />
            </div>}
        </>
    )
}

export default MapBlogPostsTooltipContent;
