import React, { useEffect, useState } from 'react';

const PropertyPanel = ({ selectedIds, viewer }) => {
  const [properties, setProperties] = useState([]);
  const [totalVolume, setTotalVolume] = useState(0);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setProperties([]);
      setTotalVolume(0);
      return;
    }

    const calculateTotalVolume = async () => {
      try {
        const data = await new Promise((resolve, reject) => {
          viewer.model.getExternalIdMapping(resolve, reject);
        });

        const arrayVolume = [];
        let total = 0;

        for (const key in data) {
          const dbId = data[key];
          const properties = await new Promise((resolve, reject) => {
            viewer.getProperties(dbId, resolve, reject);
          });

          if (properties) {
            const propertiesObj = properties.properties;
            propertiesObj.forEach((obj) => {
              if (obj.displayName === 'Volume') {
                const volume = parseFloat(obj.displayValue);
                if (!isNaN(volume)) {
                  arrayVolume.push(volume);
                  total += volume;
                }
              }
            });
          }
        }

        setTotalVolume(total);
        setProperties(arrayVolume);
      } catch (error) {
        console.error('Error calculating total volume:', error);
      }
    };

    calculateTotalVolume();
  }, [selectedIds, viewer]);

  return (
    <div className="property-panel">
      <h3>Khối lương bê tông:</h3>
      <ul>
        {properties.map((volume, index) => (
          <li key={index}>
            <h4>Object {index + 1} Volume: {volume}</h4>
          </li>
        ))}
      </ul>
      <h3>Total Volume: {totalVolume}</h3>
    </div>
  );
};

export default PropertyPanel;
