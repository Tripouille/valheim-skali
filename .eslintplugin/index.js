exports.rules = {
  'no-react-node': {
    create(context) {
      return {
        TSTypeReference(node) {
          if (
            node.typeName.type === 'TSQualifiedName' &&
            node.typeName.left.name === 'React' &&
            node.typeName.right.name === 'ReactNode'
          ) {
            context.report(
              node,
              node.loc,
              'React.ReactNode is unsafe. Use StrictReactNode instead.',
            );
          }
        },
      };
    },
  },
};
