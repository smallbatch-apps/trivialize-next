db.getData((err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  data.a = "test";
  data.b = 1111;
  db.processData(data, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    db.saveData((err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("finished");
    });
  });
});
