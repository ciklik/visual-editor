<div class='bloc' style="<?= dataToStyle($data) ?>">
    <section class="py-<?= $data['padding'] ?? 3 ?> text-<?= $data['titleAlign'] ?? 'center' ?> container" style='max-width: 960px;'>
        <div class="row">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light"><?= $data['title'] ?? 'Titre du héro'; ?></h1>
                <div class="lead text-muted"><?= $data['content'] ?? 'Ligne de texte'; ?></div>
                <p style='margin-bottom: 0;'>
                    <?php foreach(($data['buttons'] ?? []) as $action): ?>
                        <a href="<?= $action['url'] ?? '#' ?>" class="btn btn-<?= $action['type'] ?? 'primary' ?> my-2"><?= $action['label'] ?? 'Acheter' ?></a>
                    <?php endforeach ?>
                </p>
            </div>
        </div>

      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <?php foreach($data['prices'] as $item): ?>
        <div class='col'>
          <div class="card mb-4 box-shadow">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal"><?= $item['title'] ?? '' ?></h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title"><?= $item['price'] ?? 'XX' ?> <small class="text-muted">/ mo</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                  <?php foreach(explode("\n", $item['features']  ?? '') as $feature): ?>
                    <li><?= $feature ?></li>
                  <?php endforeach; ?>
              </ul>
                <?= button($item); ?>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </section>

</div>
