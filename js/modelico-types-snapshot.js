(function(M) {
  const Modelico = M.Base;
  const m = M.metadata();

  function Animal(fields) {
    M.Base.factory(Animal, fields, this);
  }

  Animal.prototype = Object.create(Modelico.prototype);

  Animal.prototype.speak = function() {
    var name = this.fields().name;
    return (name === undefined) ? "I don't have a name" : 'My name is ' + name + '!';
  };

  Animal.innerTypes = function() {
    return Object.freeze({
      'name': m.string()
    });
  };

  function Person(fields) {
    Modelico.factory(Person, fields, this);
  }

  Person.prototype = Object.create(Modelico.prototype);

  Person.prototype.fullName = function() {
    var fields = this.fields();
    return [fields.givenName, fields.familyName].join(' ').trim();
  };

  Person.innerTypes = function() {
    return Object.freeze({
      'givenName': m.string(),
      'familyName': m.string(),
      'pets': m.list(m._(Animal))
    });
  };

  window.PersonSnapshot = Person;
  window.AnimalSnapshot = Animal;
})(Modelico);
