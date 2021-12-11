<div class='bloc' style="<?= dataToStyle($data) ?>">
  <section class="text-<?= $data['titleAlign'] ?? 'center' ?> container">
    <div class="row py-lg-<?= $data['padding'] ?? 3 ?>">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light"><?= $data['title'] ?? 'Titre du héro'; ?></h1>
        <div class="lead text-muted"><?= $data['content'] ?? 'Ligne de texte'; ?></div>
        <p style='margin-bottom: 0;'>
            <?php foreach(($data['buttons'] ?? []) as $action): ?>
              <?= button($action) ?>
            <?php endforeach ?>
        </p>
      </div>
    </div>
  </section>

</div>
