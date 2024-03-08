"use strict";

const rule = {
  meta: {
    messages: {
      useTypeORMComparisonHelper: 'Use TypeORM comparison helper (e.g. Equal(id)) to handle undefined and null values correctly',
    },
    fixable: 'code',
  },
  create: context => {
    return {
      // check objects with a where property
      ObjectExpression: node => {
        const whereProperty = node.properties.find(property => property.type === 'Property' &&
          property.key.type === 'Identifier' &&
          property.key.name === 'where');
        // check if the value of the where property is also an object
        if (whereProperty &&
          whereProperty.type === 'Property' &&
          whereProperty.value.type === 'ObjectExpression') {
          const whereObject = whereProperty.value;
          // check that the values do net get passed simple identifiers
          // as the helper functions should be used to make sure
          // undefined and null are search values are handled correctly
          whereObject.properties.forEach(property => {
            if (property && property.type === 'Property') {
              const value = property.value;
              const key = property.key;
              if (value.type === 'Identifier') {
                context.report({
                  node: property,
                  messageId: 'useTypeORMComparisonHelper',
                  fix: key.type === 'Identifier'
                    ? fixer => fixer.replaceText(property, `${key.name}: Equal(${value.name})`)
                    : undefined,
                });
              }
            }
          });
        }
      },
    };
  },
};

module.exports = rule;

//# sourceMappingURL=use-typeorm-comparison-helper.js.map
