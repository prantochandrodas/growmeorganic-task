import React, { useState } from 'react';
import {
  Checkbox,Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface Subdepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
  subdepartments: Subdepartment[];
}

const departments: Department[] = [
  {
    id: 1,
    name: 'customer_service',
    subdepartments: [
      { id: 1, name: 'support' },
      { id: 2, name: 'customer_success' },
      // Add more subdepartments as needed
    ],
  },
  {
    id: 2,
    name: 'design',
    subdepartments: [
      { id: 3, name: 'graphic_design' },
      { id: 4, name: 'product_design' },
      { id: 5, name: 'web_design' },
      // Add more subdepartments as needed
    ],
  },
  // Add more departments as needed
];

const SelectCheckbox2: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedSubdepartments, setSelectedSubdepartments] = useState<number[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);

  const handleDepartmentToggle = (departmentId: number) => {
    const newSelectedDepartments = selectedDepartments.includes(departmentId)
      ? selectedDepartments.filter(id => id !== departmentId)
      : [...selectedDepartments, departmentId];

    setSelectedDepartments(newSelectedDepartments);

    // If selecting a department, select all of its subdepartments
    const selectedDepartment = departments.find(dep => dep.id === departmentId);
    if (selectedDepartment) {
      const subdepartmentIds = selectedDepartment.subdepartments.map(subdep => subdep.id);
      setSelectedSubdepartments(prevSelectedSubdepartments =>
        newSelectedDepartments.includes(departmentId)
          ? [...prevSelectedSubdepartments, ...subdepartmentIds]
          : prevSelectedSubdepartments.filter(id => !subdepartmentIds.includes(id))
      );
    }
  };

  const handleSubdepartmentToggle = (subdepartmentId: number, departmentId: number) => {
    const newSelectedSubdepartments = selectedSubdepartments.includes(subdepartmentId)
      ? selectedSubdepartments.filter(id => id !== subdepartmentId)
      : [...selectedSubdepartments, subdepartmentId];

    setSelectedSubdepartments(newSelectedSubdepartments);

    // Check if all subdepartments of a department are selected
    const selectedDepartment = departments.find(dep => dep.id === departmentId);
    if (selectedDepartment) {
      const subdepartmentIds = selectedDepartment.subdepartments.map(subdep => subdep.id);
      if (subdepartmentIds.every(id => newSelectedSubdepartments.includes(id))) {
        handleDepartmentToggle(departmentId);
      }
    }
  };

  const handleDepartmentCollapseToggle = (departmentId: number) => {
    setExpandedDepartments(prevExpandedDepartments =>
      prevExpandedDepartments.includes(departmentId)
        ? prevExpandedDepartments.filter(id => id !== departmentId)
        : [...prevExpandedDepartments, departmentId]
    );
  };

  return (
    <Box sx={{ width: '90%', marginLeft: '5%' }}>
        <List>
      {departments.map(department => (
        <React.Fragment key={department.id}>
          <ListItem button onClick={() => handleDepartmentCollapseToggle(department.id)}>
            <ListItemIcon>
              {expandedDepartments.includes(department.id) ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <Checkbox
              edge="end"
              checked={selectedDepartments.includes(department.id)}
              onChange={() => handleDepartmentToggle(department.id)}
            />
          </ListItem>
          <Collapse in={expandedDepartments.includes(department.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subdepartments.map(subdepartment => (
                <ListItem
                  key={subdepartment.id}
                  button
                  sx={{ pl: 4 }}
                  onClick={() => handleSubdepartmentToggle(subdepartment.id, department.id)}
                >
                  <ListItemText primary={subdepartment.name} />
                  <Checkbox
                    edge="end"
                    checked={selectedSubdepartments.includes(subdepartment.id)}
                    onChange={() => handleSubdepartmentToggle(subdepartment.id, department.id)}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    </Box>
  );
};

export default SelectCheckbox2;
