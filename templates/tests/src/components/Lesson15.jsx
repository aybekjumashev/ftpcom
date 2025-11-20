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
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import {
  Quiz as QuizIcon,
  ExpandMore as ExpandMoreIcon,
  Check as CheckIcon,
  Assignment as PlanIcon,
  PresentToAll as PresentIcon,
  RateReview as EvaluateIcon,
  EmojiEvents as CriteriaIcon
} from '@mui/icons-material';

const Lesson15 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [lessonPlan, setLessonPlan] = useState({
    title: '',
    level: 'B2',
    objectives: '',
    materials: '',
    stages: [],
    timing: '',
    interaction: '',
    assessment: ''
  });
  const [currentStage, setCurrentStage] = useState({
    name: '',
    description: '',
    timing: ''
  });
  const [reflection, setReflection] = useState('');
  const [evaluations, setEvaluations] = useState({});

  const assessmentCriteria = [
    {
      criterion: 'Lesson Objectives',
      levels: {
        excellent: 'Clear, measurable',
        good: 'Mostly clear',
        needsImprovement: 'Vague or missing'
      }
    },
    {
      criterion: 'Skills Integration',
      levels: {
        excellent: 'At least 2 skills fully integrated',
        good: 'Skills partially integrated',
        needsImprovement: 'Skills not integrated'
      }
    },
    {
      criterion: 'Activities',
      levels: {
        excellent: 'Creative, engaging',
        good: 'Somewhat engaging',
        needsImprovement: 'Boring or unclear'
      }
    },
    {
      criterion: 'Presentation',
      levels: {
        excellent: 'Confident, clear',
        good: 'Adequate',
        needsImprovement: 'Unclear or unprepared'
      }
    },
    {
      criterion: 'Assessment',
      levels: {
        excellent: 'Effective and varied',
        good: 'Basic check',
        needsImprovement: 'No assessment'
      }
    }
  ];

  const handleLessonPlanChange = (field, value) => {
    setLessonPlan(prev => ({ ...prev, [field]: value }));
  };

  const handleStageChange = (field, value) => {
    setCurrentStage(prev => ({ ...prev, [field]: value }));
  };

  const addStage = () => {
    if (currentStage.name && currentStage.description) {
      setLessonPlan(prev => ({
        ...prev,
        stages: [...prev.stages, currentStage]
      }));
      setCurrentStage({ name: '', description: '', timing: '' });
    }
  };

  const handleEvaluationChange = (criterion, value) => {
    setEvaluations(prev => ({ ...prev, [criterion]: value }));
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        mb: 3,
        textAlign: 'center'
      }}>
        4.5 – Final Project: Lesson Plan Design and Demo Presentation
      </Typography>

      {/* Module Info */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            Module: Professional Competence
          </Typography>
          <Typography>
            <strong>Aim:</strong> To apply all learned skills by designing, presenting, and evaluating a full integrated lesson plan.
          </Typography>
        </CardContent>
      </Card>

      {/* Project Overview */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Project Overview
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Each student creates a complete lesson plan that integrates at least two language skills" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="The lesson should be suitable for a B2-level English class (45-60 minutes)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Students will present their lesson plan to the class or in small groups" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Peer and teacher evaluation will follow" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Step 1: Lesson Plan Design */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PlanIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Step 1: Lesson Plan Design
            </Typography>
          </Box>
          
          <Typography paragraph>
            <strong>Components to include:</strong>
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lesson Title"
                value={lessonPlan.title}
                onChange={(e) => handleLessonPlanChange('title', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Level"
                value={lessonPlan.level}
                onChange={(e) => handleLessonPlanChange('level', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Lesson Objectives"
                value={lessonPlan.objectives}
                onChange={(e) => handleLessonPlanChange('objectives', e.target.value)}
                helperText="Clear, measurable aims (e.g., Students will be able to discuss digital tools for learning)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Materials"
                value={lessonPlan.materials}
                onChange={(e) => handleLessonPlanChange('materials', e.target.value)}
                helperText="Texts, audio, video clips, worksheets, digital tools, etc."
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Lesson Stages:
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Stage Name"
                    value={currentStage.name}
                    onChange={(e) => handleStageChange('name', e.target.value)}
                    placeholder="e.g., Lead-in, Main Task"
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={currentStage.description}
                    onChange={(e) => handleStageChange('description', e.target.value)}
                    placeholder="Activity details"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Timing (min)"
                    value={currentStage.timing}
                    onChange={(e) => handleStageChange('timing', e.target.value)}
                  />
                </Grid>
              </Grid>
              
              <Button 
                variant="outlined" 
                onClick={addStage}
                disabled={!currentStage.name || !currentStage.description}
                sx={{ mb: 3 }}
              >
                Add Stage
              </Button>
              
              {lessonPlan.stages.length > 0 && (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Stage</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                      <TableCell><strong>Timing</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lessonPlan.stages.map((stage, index) => (
                      <TableRow key={index}>
                        <TableCell>{stage.name}</TableCell>
                        <TableCell>{stage.description}</TableCell>
                        <TableCell>{stage.timing} min</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Interaction Patterns"
                value={lessonPlan.interaction}
                onChange={(e) => handleLessonPlanChange('interaction', e.target.value)}
                helperText="Individual, pair, group work, whole class"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Assessment Methods"
                value={lessonPlan.assessment}
                onChange={(e) => handleLessonPlanChange('assessment', e.target.value)}
                helperText="How you will check student understanding"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Task 2: Demo Presentation */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PresentIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task 2: Demo Presentation
            </Typography>
          </Box>
          
          <Typography paragraph>
            Prepare a 5-7 minute presentation explaining your lesson plan:
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Highlight objectives, activities, skills integrated, and assessment methods" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Optionally demonstrate part of the lesson with classmates" />
            </ListItem>
          </List>
          
          <Typography paragraph sx={{ mt: 2, fontStyle: 'italic' }}>
            Tip: Practice your presentation timing and prepare visual aids if needed.
          </Typography>
        </CardContent>
      </Card>

      {/* Step 3: Peer and Teacher Evaluation */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <EvaluateIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Step 3: Peer and Teacher Evaluation
            </Typography>
          </Box>
          
          <Typography paragraph>
            Use the criteria below to evaluate presentations:
          </Typography>
          
          <Grid container spacing={3}>
            {assessmentCriteria.map((criterion, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography fontWeight="bold" gutterBottom>
                    {criterion.criterion}
                  </Typography>
                  
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={evaluations[criterion.criterion] || ''}
                      onChange={(e) => handleEvaluationChange(criterion.criterion, e.target.value)}
                    >
                      <FormControlLabel
                        value="excellent"
                        control={<Radio color="success" />}
                        label={
                          <Box>
                            <Typography fontWeight="bold">Excellent (5)</Typography>
                            <Typography variant="body2">{criterion.levels.excellent}</Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="good"
                        control={<Radio color="primary" />}
                        label={
                          <Box>
                            <Typography fontWeight="bold">Good (4)</Typography>
                            <Typography variant="body2">{criterion.levels.good}</Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="needsImprovement"
                        control={<Radio color="warning" />}
                        label={
                          <Box>
                            <Typography fontWeight="bold">Needs Improvement (2-3)</Typography>
                            <Typography variant="body2">{criterion.levels.needsImprovement}</Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Constructive Feedback"
            sx={{ mt: 3 }}
            placeholder="Provide specific suggestions for improvement..."
          />
        </CardContent>
      </Card>

      {/* Assessment Criteria */}
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CriteriaIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Assessment Criteria
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Criterion</strong></TableCell>
                <TableCell><strong>Excellent (5)</strong></TableCell>
                <TableCell><strong>Good (4)</strong></TableCell>
                <TableCell><strong>Needs Improvement (2-3)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assessmentCriteria.map((criterion, index) => (
                <TableRow key={index}>
                  <TableCell>{criterion.criterion}</TableCell>
                  <TableCell>{criterion.levels.excellent}</TableCell>
                  <TableCell>{criterion.levels.good}</TableCell>
                  <TableCell>{criterion.levels.needsImprovement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>

      {/* Homework / Follow-up */}
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Homework / Follow-up
          </Typography>
          
          <Typography paragraph>
            Reflect on feedback and write a short paragraph:
          </Typography>
          
          <Typography paragraph sx={{ fontStyle: 'italic', textAlign: 'center' }}>
            "What I learned from designing and presenting my lesson plan."
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            helperText="100-150 words"
          />
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
          onClick={() => console.log("Submitted:", { lessonPlan, evaluations, reflection })}
          sx={{ px: 4, py: 1.5 }}
        >
          Submit Final Project
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PlanIcon />}
          onClick={() => window.open('https://docs.google.com/document/d/1YOUR_TEMPLATE_ID', '_blank')}
          sx={{ px: 4, py: 1.5 }}
        >
          Lesson Plan Template
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/test/15')}
          sx={{ px: 4, py: 1.5 }}
        >
          Пройти тест по планированию
        </Button>
      </Box>
    </Box>
  );
};

export default Lesson15;