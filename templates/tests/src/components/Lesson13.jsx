import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Grid,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Quiz as QuizIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  People as PairIcon,
  Groups as GroupWorkIcon,
  SelfImprovement as AutonomyIcon,
  PresentToAll as PresentIcon
} from '@mui/icons-material';

const Lesson13 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [groupPlan, setGroupPlan] = useState({
    taskDescription: '',
    languageFocus: '',
    interactionType: '',
    expectedOutcomes: ''
  });
  const [selectedTechnique, setSelectedTechnique] = useState('');

  const techniques = [
    {
      name: 'Task-Based Language Teaching (TBLT)',
      description: 'Students complete meaningful tasks that use language naturally',
      icon: <AssignmentIcon color="primary" />,
      examples: [
        'Planning a holiday itinerary (speaking + writing)',
        'Conducting a survey and reporting results (listening + speaking)',
        'Solving a mystery based on clues (reading + speaking)'
      ]
    },
    {
      name: 'Pair Work',
      description: 'Two students work together on a language task',
      icon: <PairIcon color="primary" />,
      examples: [
        'Role-playing customer/shopkeeper dialogues',
        'Peer editing of written work',
        'Information gap activities'
      ]
    },
    {
      name: 'Group Work',
      description: 'Small groups collaborate to achieve a common goal',
      icon: <GroupWorkIcon color="primary" />,
      examples: [
        'Creating a group presentation',
        'Debating a topic with assigned roles',
        'Collaborative story writing'
      ]
    },
    {
      name: 'Student Autonomy',
      description: 'Students make choices about their learning activities',
      icon: <AutonomyIcon color="primary" />,
      examples: [
        'Self-selected reading materials',
        'Personal learning contracts',
        'Choice of project topics'
      ]
    }
  ];

  const handleGroupPlanChange = (field, value) => {
    setGroupPlan(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 3,
        textAlign: 'center'
      }}>
        4.3 – Student-Centered Teaching Techniques
      </Typography>

      {/* Module Info */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            Module: Professional Competence
          </Typography>
          <Typography>
            <strong>Objective:</strong> To explore learner-centered teaching methods such as Task-Based Language Teaching (TBLT), pair and group work, and other student-focused techniques.
          </Typography>
        </CardContent>
      </Card>

      {/* What is Student-Centered Teaching */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            What is Student-Centered Teaching?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Student-centered teaching shifts the focus from the teacher to the learners. Instead of just listening and memorizing, students actively participate, collaborate, and take responsibility for their learning.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Key Techniques */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Key Techniques
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Technique</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {techniques.map((tech, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{tech.name}</TableCell>
                  <TableCell>{tech.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>

      {/* Examples of TBLT Activities */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Examples of TBLT Activities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {techniques[0].examples.map((example, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={example} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Task 1: Reflect and Write */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Task 1: Reflect and Write (Individual)
          </Typography>
          <Typography paragraph>
            Think about your own experience as a learner. Answer briefly (50-70 words):
          </Typography>
          <Typography paragraph sx={{ fontStyle: 'italic' }}>
            1. Have you ever done pair or group work in English class?<br />
            2. How did it help you improve your skills?<br />
            3. Which student-centered method would you like to try as a teacher?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            helperText="50-70 words"
          />
        </CardContent>
      </Card>

      {/* Task 2: Pair Work Activity */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PairIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task 2: Pair Work Activity
            </Typography>
          </Box>
          
          <Typography paragraph>
            <strong>Instructions:</strong> In pairs, role-play organizing a weekend event for international students.
          </Typography>
          
          <Typography paragraph sx={{ fontStyle: 'italic', pl: 2 }}>
            1. Discuss event ideas<br />
            2. Decide on the activity<br />
            3. Write a short invitation email together
          </Typography>
          
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Skills practiced:</strong> Speaking, writing, negotiation, cooperation
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Your invitation email draft"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            helperText="Write the email you created with your partner"
          />
        </CardContent>
      </Card>

      {/* Task 3: Group Work Planning */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <GroupWorkIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task 3: Group Work Planning
            </Typography>
          </Box>
          
          <Typography paragraph>
            In groups of 3-4, design a 15-minute interactive lesson segment using TBLT or pair/group work techniques:
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Description"
                value={groupPlan.taskDescription}
                onChange={(e) => handleGroupPlanChange('taskDescription', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Language Focus"
                value={groupPlan.languageFocus}
                onChange={(e) => handleGroupPlanChange('languageFocus', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Interaction Type (pair/group)"
                value={groupPlan.interactionType}
                onChange={(e) => handleGroupPlanChange('interactionType', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Expected Outcomes"
                value={groupPlan.expectedOutcomes}
                onChange={(e) => handleGroupPlanChange('expectedOutcomes', e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Homework Task */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PresentIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Homework Task
            </Typography>
          </Box>
          
          <Typography paragraph>
            Choose one student-centered technique and prepare a 5-minute presentation explaining how you would use it in your future classroom:
          </Typography>
          
          <Typography paragraph sx={{ fontStyle: 'italic', pl: 2 }}>
            1. Select a technique from the list<br />
            2. Explain why you chose it<br />
            3. Provide specific examples of activities<br />
            4. Describe expected benefits
          </Typography>
          
          <FormControl component="fieldset" fullWidth sx={{ mt: 2 }}>
            <RadioGroup
              value={selectedTechnique}
              onChange={(e) => setSelectedTechnique(e.target.value)}
            >
              {techniques.map((tech, index) => (
                <FormControlLabel
                  key={index}
                  value={tech.name}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 1 }}>{tech.icon}</Box>
                      {tech.name}
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      {/* Action Buttons - Updated with consistent styling */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2,
        mt: 4,
        mb: 4
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Submitted:", { reflection, emailContent, groupPlan, selectedTechnique })}
          sx={{ px: 4, py: 1.5 }}
        >
          Submit All Tasks
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<GroupIcon />}
          onClick={() => window.open('https://padlet.com', '_blank')}
          sx={{ px: 4, py: 1.5 }}
        >
          Group Work Resources
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/13')}
          sx={{ px: 4, py: 1.5 }}
        >
          Пройти тест
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson13;