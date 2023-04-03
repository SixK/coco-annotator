<template>
  <div class="col-md-3">
    <div
      class="card mb-4 box-shadow"
      @click="onCardClick"
    >
      <div class="card-body">
        <span
          class="d-inline-block text-truncate"
          style="max-width: 75%; float: left"
        >
          <i
            class="fa fa-circle color-icon"
            aria-hidden="true"
            :style="{ color: category.color }"
          />
          <strong class="card-title">{{ category.name }}</strong>
        </span>

        <i
          :id="'dropdownCategory' + category.id"
          class="card-text fa fa-ellipsis-v fa-x icon-more"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          aria-hidden="true"
        />

        <br>

        <div>
          <p v-if="category.numberAnnotations > 0">
            {{ category.numberAnnotations }} objects have been made with this
            category.
          </p>
          <p v-else>
            No annotations use this category
          </p>
        </div>

        <div
          class="dropdown-menu"
          :aria-labelledby="'dropdownCategory' + category.id"
        >
          <a
            class="dropdown-item"
            @click="onDeleteClick"
          >Delete</a>
          <!--<a class="dropdown-item" @click="onDownloadClick"
            >Download COCO & Images</a
          >-->
          <button
            class="dropdown-item"
            data-bs-toggle="modal"
            :data-bs-target="'#categoryEdit' + category.id"
          >
            Edit
          </button>
        </div>
      </div>

      <div
        v-show="$store.getters['user/loginEnabled']"
        class="card-footer text-muted"
      >
        Created by {{ category.creator }}
      </div>
    </div>

    <div
      :id="'categoryEdit' + category.id"
      ref="category_settings"
      class="modal fade"
      role="dialog"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Category: {{ category.name }}
            </h5>
            <button
              type="button"
              class="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  :value="name"
                  required="true"
                  class="form-control"
                  :class="{ 'is-invalid': name.length === 0 }"
                  @input="name = $event.target.value"
                >
              </div>

              <div class="form-group">
                <label>Supercategory</label>
                <input
                  type="text"
                  class="form-control"
                  :value="category.supercategory"
                  @input="supercategory = $event.target.value"
                >
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Color</label>
                <div class="col-sm-9">
                  <input
                    v-model="color"
                    type="color"
                    class="form-control"
                  >
                </div>
              </div>

              <div class="form-group">
                <KeypointsDefinition
                  ref="keypoints"
                  v-model="keypoint"
                  element-id="keypoints"
                  placeholder="Add a keypoint"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              :disabled="!isFormValid"
              :class="{ disabled: !isFormValid }"
              data-bs-dismiss="modal"
              @click="onUpdateClick"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import toastrs from "@/mixins/toastrs";
// import TagsInput from "@/components/TagsInput";
import KeypointsDefinition from "@/components/KeypointsDefinition";
import JQuery from "jquery";

let $ = JQuery;

export default {
  name: "CategoryCard",
  components: { KeypointsDefinition },
  mixins: [toastrs],
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      group: null,
      supercategory: this.category.supercategory,
      color: this.category.color,
      metadata: [],
      keypoint: {
        labels: [...this.category.keypoint_labels],
        edges: [...this.category.keypoint_edges],
        colors: [...this.category.keypoint_colors],
      },
      name: this.category.name,
      isMounted: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.isMounted &&
        this.name.length !== 0 &&
        this.$refs &&
        this.$refs.keypoints &&
        this.$refs.keypoints.valid
      );
    }
  },
  created() {
    this.resetCategorySettings();
  },
  mounted() {
    $(this.$refs.category_settings).on(
      "hidden.bs.modal",
      this.resetCategorySettings
    );
    this.isMounted = true;
  },
  methods: {
    resetCategorySettings() {
      this.name = this.category.name;
      this.supercategory = this.category.supercategory;
      this.color = this.category.color;
      this.keypoint = {
        labels: [...this.category.keypoint_labels],
        edges: [...this.category.keypoint_edges],
        colors: [...this.category.keypoint_colors],
      };
    },
    onCardClick() {},
    onDownloadClick() {},
    onDeleteClick() {
      axios.delete("/api/category/" + this.category.id).then(() => {
        this.$parent.updatePage();
      });
    },
    onUpdateClick() {
      axios
        .put("/api/category/" + this.category.id, {
          name: this.name,
          color: this.color,
          supercategory: this.supercategory,
          metadata: this.metadata,
          keypoint_edges: this.keypoint.edges,
          keypoint_labels: this.keypoint.labels,
          keypoint_colors: this.keypoint.colors,
        })
        .then(() => {
          this.axiosReqestSuccess(
            "Updating Category",
            "Category successfully updated"
          );
          this.category.name = this.name;
          this.category.supercategory = this.supercategory;
          this.category.color = this.color;
          this.category.metadata = { ...this.metadata };
          this.category.keypoint_edges = [...this.keypoint.edges];
          this.category.keypoint_labels = [...this.keypoint.labels];
          this.category.keypoint_colors = [...this.keypoint.colors];
          this.$parent.updatePage();
        })
        .catch(error => {
          this.axiosReqestError(
            "Updating Category",
            error.response.data.message
          );
          this.$parent.updatePage();
        });
    }
  },
};
</script>

<style scoped>
.icon-more {
  width: 10%;
  margin: 3px 0;
  padding: 0;
  float: right;
  color: black;
}

.card-body {
  padding: 10px 10px 0 10px;
}

.color-icon {
  display: inline;
  margin: 0;
  padding-right: 10px;
}

.card-footer {
  padding: 2px;
  font-size: 11px;
}
</style>
