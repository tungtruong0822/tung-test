import React, { useEffect, useState } from 'react';

const PropertyPanel = ({ selectedIds, viewer }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setProperties([]);
      return;
    }

    const propertyDb = viewer.model.getPropertyDb();
    const objectProperties = selectedIds.map((objectId) => {
      const props = propertyDb.getProperties(objectId);
      return { objectId, properties: props };
    });

    setProperties(objectProperties);
  }, [selectedIds, viewer]);

  return (
    <div className="property-panel">
      <h3>Selected Object Properties:</h3>
      <ul>
        {properties.map(({ objectId, properties }) => (
          <li key={objectId}>
            <h4>Object ID: {objectId}</h4>
            <ul>
              {properties.map((property, index) => (
                <li key={index}>
                  {property.displayName}: {property.displayValue}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyPanel;
