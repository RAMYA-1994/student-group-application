app.get('/students/cluster', async (req, res) => {
    const students = await Student.find();
    students.sort((a, b) => a.marks - b.marks);
  
    const groups = [];
    const groupSize = Math.ceil(students.length / 3); // Adjust based on the number of groups needed
  
    for (let i = 0; i < students.length; i += groupSize) {
      const group = students.slice(i, i + groupSize);
      groups.push(group);
    }
  
    res.json(groups);
  });
  