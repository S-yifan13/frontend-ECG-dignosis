<template>
    <div>
      <h1>{{ title }}</h1>
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in people" :key="index">
            <td>{{ person.name }}</td>
            <td>{{ person.age }}</td>
            <td>{{ person.gender }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    name: 'Template',
    props: {
      title: String,
      people: Array
    },
    methods: {
      generatePdf() {
        const doc = new jsPDF();
        doc.text(this.title, 10, 10);
        doc.autoTable({
          startY: 20,
          head: [['姓名', '年龄', '性别']],
          body: this.people.map(person => [person.name, person.age, person.gender])
        });
        doc.save('example.pdf');
      }
    }
  };
  </script>