import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import {
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from '@packages/utils/auth';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import FormLabel from '@packages/components/core/Interactive/FormControl';
import Select from '@packages/components/core/Interactive/Select';

export interface RolePermissionsFormProps extends DataAttributes {
  permissions: Permissions;
  onChange: (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => void;
}

const RolePermissionsForm: React.FC<RolePermissionsFormProps> = ({
  dataCy,
  permissions,
  onChange,
}) => {
  return (
    <Table colorScheme="blue" size="sm">
      <Tbody>
        {Object.values(PermissionCategory).map(category => (
          <Tr key={category}>
            <Th w="20%">
              <FormLabel htmlFor={category} m="0">
                {PERMISSION_CATEGORY_TO_LABEL[category]}
              </FormLabel>
            </Th>
            <Td>
              <Select
                dataCy={getDataValue(dataCy, category, 'select')}
                id={category}
                maxW="max-content"
                value={permissions[category]}
                onChange={onChange(category)}
              >
                {Object.values(PermissionPrivilege).map(privilege => (
                  <option key={privilege} value={privilege}>
                    {PERMISSION_PRIVILEGE_TO_LABEL[privilege]}
                  </option>
                ))}
              </Select>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RolePermissionsForm;
