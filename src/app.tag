<app>
  <h1>{ message }</h1>
  <button class="btn btn-primary">Bootstrap Button</button>

  <script>
    const tag = this

    tag.message = 'Smelly world'

    tag.on('mount', function(){
      var btn = $('.btn-primary' , tag.root).on('click' , function() {
          alert('Hello again')
      })
    })
  </script>

  <style>
    :scope { display: block;}
    h1 { color: red; }
   </style>
</app>
